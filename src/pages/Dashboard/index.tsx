import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
// import formatDate from '../../utils/formatDate';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  Form,
  Error,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [inputError, setInputError] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const formattedTransaction = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );

      const formattedBalance = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      };

      setTransactions(formattedTransaction);
      setBalance(formattedBalance);
    }
    loadTransactions();
  }, [transactions]);

  async function handleAddTransaction(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!title || !value || !type || !category) {
      setInputError('All the fields are required');
      return;
    }

    if (type.toLowerCase() !== 'income' && type !== 'outcome') {
      setInputError('Type must be income or outcome');
      return;
    }

    const data = {
      title,
      value,
      type,
      category,
    };

    try {
      await api.post('transactions', data);

      setInputError('');
      setTitle('');
      setValue('');
      setType('');
      setCategory('');
    } catch (err) {
      setInputError('Invalid transaction');
    }
  }

  async function handleDeleteTransaction(id: string): Promise<void> {
    try {
      await api.delete(`transactions/${id}`);

      setTransactions(
        transactions.filter(transaction => transaction.id !== id),
      );
    } catch (err) {
      alert('Error trying to delete incident. Try again.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Income</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Outcome</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <Container>
          <Form hasError={!!inputError} onSubmit={handleAddTransaction}>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Value"
            />
            <input
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder="Income/Outcome"
            />
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Category"
            />

            <button type="submit">Add</button>
          </Form>
          {inputError && <Error>{inputError}</Error>}
        </Container>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Value</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction: Transaction) => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

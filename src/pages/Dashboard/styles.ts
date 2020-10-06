import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface CardProps {
  total?: boolean;
}

interface FormProps {
  hasError: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#FF872C' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 40px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }

      button {
        /* position: absolute; */
        right: 24px;
        top: 24px;
        border: 0;
        transition: filter 0.2s;

        &:hover {
          opacity: 0.6;
        }
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    flex: 1;
    height: 70px;
    padding: 0 18px;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #3a3a3a;

    ${props =>
    props.hasError &&
    css`
        border-color: #c53030;
      `}

    & + input {
      margin-left: 20px;
    }

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    margin-left: 20px;
    background: #5636d3;
    border-radius: 5px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#5636d3')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

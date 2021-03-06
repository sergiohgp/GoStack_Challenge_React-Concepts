import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const currentPage = useHistory().location.pathname.toLowerCase();
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link
            className={
              currentPage.includes('dashboard') ? 'tabActive' : 'notCurrent'
            }
            to="/dashboard"
          >
            Transaction List
          </Link>
          <Link
            className={
              currentPage.includes('import') ? 'tabActive' : 'notCurrent'
            }
            to="/import"
          >
            Import File
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;

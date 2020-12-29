import React from 'react';
import { MobileHeader } from './mobileHeader/MobileHeader';
import { MobileNav } from './mobileNav/MobileNav';
import '../sass/main.module.scss';

type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <MobileHeader />

      {children}

      <MobileNav />
    </main>
  );
};

export { Layout };

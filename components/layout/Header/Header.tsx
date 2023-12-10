import { FC } from 'react';
import { Brand } from '@/components/common';

export const Header: FC = () => {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <Brand logo name slogan/>
      </div>
    </header>
  );
};

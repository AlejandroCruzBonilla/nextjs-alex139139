import { FC } from 'react';
import { MainMenu } from '../MainMenu';
import { Brand } from '@/components/common';
import type { HeaderProps } from './interfaces';

export const Header: FC<HeaderProps> = ({ mainMenuItem }) => {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <Brand logo name slogan />
        <MainMenu items={mainMenuItem} />
      </div>
    </header>
  );
};

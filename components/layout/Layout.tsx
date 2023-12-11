import { FC } from 'react';
import { PreviewAlert } from '@/components/common';
import { Header } from './Header';
import type { LayoutProps } from './interfaces';

export const Layout: FC<LayoutProps> = ({ children, mainMenuItem }) => {
  return (
    <>
      <PreviewAlert />
      <div>
        <Header mainMenuItem={mainMenuItem} />
        <main className='container py-10 mx-auto'>{children}</main>
      </div>
    </>
  );
};

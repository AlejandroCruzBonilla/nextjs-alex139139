import { FC } from 'react';
import { PreviewAlert } from '@/components/common';
import { Header } from './Header';
import { Footer } from './Footer';
import type { LayoutProps } from './interfaces';

export const Layout: FC<LayoutProps> = ({
  children,
  mainMenuItems,
  socialMediaMenuItems,
}) => {
  return (
    <>
      <PreviewAlert />
      <Header mainMenuItems={mainMenuItems} />
      <main className='main'>
        <div className='main__wrapper'>{children}</div>
      </main>
      <Footer socialMediaMenuItems={socialMediaMenuItems} />
    </>
  );
};

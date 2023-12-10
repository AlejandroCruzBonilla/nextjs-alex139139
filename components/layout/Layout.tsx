import { PreviewAlert } from '../common';
import { Header } from './Header';

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <div>
        <Header />
        <main className='container py-10 mx-auto'>{children}</main>
      </div>
    </>
  );
}

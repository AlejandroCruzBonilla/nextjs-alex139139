import { FC } from 'react';
import Link from 'next/link';
import { Logo } from '../Logo';
import type { BrandProps } from './interfaces';

export const Brand: FC<BrandProps> = ({ logo, name, slogan }) => {
  return (
    <div className='brand'>
      {logo && (
        <Link href='/' className='brand__logo'>
          <Logo />
        </Link>
      )}
      {name && (
        <div className='brand__name'>
          <Link href='/'>Alex139139</Link>
        </div>
      )}
      {slogan && <div className='brand__slogan'>Desarrollo Fullstack</div>}
    </div>
  );
};

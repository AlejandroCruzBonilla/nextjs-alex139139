import { FC } from 'react';
import NextLink from 'next/link';
import { Brand } from '@/components/common';
import type { FooterProps } from './interfaces';

export const Footer: FC<FooterProps> = ({ socialMediaMenuItems }) => {
  return (
    <footer className='footer'>
      <div className='footer__divider'>
        <hr />
      </div>
      <div className='footer__wrapper'>
        <Brand logo />
        <nav role='navigation' className='nav-social'>
          <ul className='nav-social__links'>
            {socialMediaMenuItems.map(({ id, url, title }) => (
              <li key={id}>
                <NextLink
                  target='_blank'
                  rel='noreferrer'
                  className='nav-social__link'
                  title={title}
                  href={url}
                >
                  <span className='nav-social__title' title={title}>{title}</span>
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

import { FC } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';

import { Button } from 'primereact/button';

import { MainMenuProps } from './interfaces';
import { useRouter } from 'next/router';

export const MainMenu: FC<MainMenuProps> = ({ items }) => {
  const router = useRouter();

  return (
    <>
      <nav role='navigation' className='nav-main'>
        <div className='nav-main__desktop'>
          <ul className='nav-main__links'>
            {items.map(({ id, url, title }) => (
              <li key={id}>
                <NextLink
                  className={classNames('nav-main__link', {
                    'active-link': router.asPath === url,
                  })}
                  title={title}
                  href={url}
                >
                  {title}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
        <div className='nav-main__mobile'>
          <Button text label='MENU' />
        </div>
      </nav>
    </>
  );
};

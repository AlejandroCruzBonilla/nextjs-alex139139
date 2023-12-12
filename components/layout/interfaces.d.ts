import type { ReactNode } from 'react';
import type { DrupalMenuLinkContent } from 'next-drupal';

export interface LayoutProps {
  children: ReactNode | ReactNode[];
  mainMenuItems: DrupalMenuLinkContent[];
  socialMediaMenuItems: DrupalMenuLinkContent[];
}

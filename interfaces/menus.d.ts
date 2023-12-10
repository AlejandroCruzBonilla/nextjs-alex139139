import type { DrupalMenuLinkContent } from 'next-drupal';

export interface Menu {
  items: DrupalMenuLinkContent[];
  tree: DrupalMenuLinkContent[];
}

export interface MenuItems {
  mainMenu: Menu;
  socialMediaMenu: Menu;
}

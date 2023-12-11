import { MenuItems } from '@/interfaces/menus';
import { drupal } from '@/helpers';

export const getMenus = () => {
  return new Promise<MenuItems>((resolve, reject) => {
    Promise.all([
			drupal.getMenu('main'),
			drupal.getMenu('social-media')])
			.then(
				([mainMenu, socialMediaMenu]) => {
					resolve({
						mainMenu,
						socialMediaMenu,
					})
				}
    	);
  });
};

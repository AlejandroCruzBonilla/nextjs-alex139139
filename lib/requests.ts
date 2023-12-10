import { MenuItems } from '@/interfaces/menus';
import { drupal } from '@/lib/drupal';

export const getMenuItems = () => {
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

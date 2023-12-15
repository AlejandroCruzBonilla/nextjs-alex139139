import { FC } from 'react';
import type { ChipProps } from './interfaces';

import styles from '@/styles/modules/chip.module.scss'

export const Chip: FC<ChipProps> = ({ icon, name }) => {
  return (
    <div className={styles.chip}>
      {icon && <div className={styles.chip__icon}>
				<i aria-hidden className={icon} />
			</div>}
      {name && <div className={styles.chip__name}>{name}</div>}
    </div>
  );
};

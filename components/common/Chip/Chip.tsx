import { FC } from 'react';
import type { ChipProps } from './interfaces';
import classNames from 'classnames';

import styles from '@/styles/modules/chip.module.scss';

export const Chip: FC<ChipProps> = ({
  icon,
  name,
  button,
  disabled,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(styles.chip, {
        'cursor-pointer': button,
        grayscale: disabled,
      })}
    >
      {icon && (
        <div className={styles.chip__icon}>
          <i aria-hidden className={icon} />
        </div>
      )}
      {name && <div className={styles.chip__name}>{name}</div>}
    </div>
  );
};

import { FC } from 'react';
import type { PostedUserDateProps } from './interfaces';
import { formatDate } from '@/helpers';

import styles from '@/styles/modules/postedUserDate.module.scss'

export const PostedUserDate: FC<PostedUserDateProps> = ({
	postUser,
	postedDate,
}) => {
  return (
    <div className={styles.posted}>
      <span>
        Publicado por <span className={styles.posted__user}>{postUser}</span>
      </span>
      <span> - {formatDate(postedDate)}</span>
    </div>
  );
};

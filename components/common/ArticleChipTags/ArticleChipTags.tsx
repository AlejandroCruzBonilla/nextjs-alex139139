import { FC } from 'react';
import NextLink from 'next/link';
import { Chip } from '@/components/common';
import type { ArticleChipTagsProps } from './interfaces';

export const ArticleChipTags: FC<ArticleChipTagsProps> = ({ tags }) => {
  return (
    <div className='flex gap-3 flex-wrap'>
      {tags.map(({ field_icon_class, name, id, path }) => (
        // <NextLink key={id} href={path.alias} rel='bookmark'>
        //   <Chip icon={field_icon_class} name={name} />
        // </NextLink>
          <Chip key={id} icon={field_icon_class} name={name} />
      ))}
    </div>
  );
};

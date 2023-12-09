import { FC } from 'react';
import type { SeoProps } from './interfaces';

export const Seo: FC<SeoProps> = ({ metaTags }) => {
  return (
    <>
      {metaTags.map(({ tag, attributes }, index) => {
        const Tag = tag;
        return <Tag {...attributes} key={index} />;
      })}
    </>
  );
};

import { FC } from 'react';
import type { PictureProps } from './interfaces';


export const Picture: FC<PictureProps> = ({
  alt,
  height,
  priority = 'lazy',
  sources,
  title,
  url,
  width,
}) => {
  return (
    <picture>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
          width={source.width}
          height={source.height}
        />
      ))}
      <img
        loading={priority}
        src={url}
        width={width}
        height={height}
        alt={alt}
        title={title}
      />
    </picture>
  );
};

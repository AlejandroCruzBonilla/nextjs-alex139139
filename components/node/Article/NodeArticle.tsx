import { formatDate } from '@/helpers';
import { Picture } from '@/components/common';
import { responsiveImage } from '@/helpers/images';
import { NodeArticleProps } from './interfaces';

export const NodeArticle = ({ node, ...props }: NodeArticleProps) => {
  const { field_image } = node;

  const { field_media_image } = field_image;

  return (
    <article {...props}>
      <h1 className='mb-4 text-6xl font-black leading-tight'>{node.title}</h1>
      <div className='mb-4 text-gray-600'>
        {node.uid?.display_name ? (
          <span>
            Posted by{' '}
            <span className='font-semibold'>{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure>
          <Picture {...responsiveImage(field_media_image)} />
          {field_media_image.resourceIdObjMeta.title && (
            <figcaption className='py-2 text-sm text-center text-gray-600'>
              {field_media_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.field_body && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_body }}
          className='mt-6 font-serif text-xl leading-loose prose'
        />
      )}
    </article>
  );
};

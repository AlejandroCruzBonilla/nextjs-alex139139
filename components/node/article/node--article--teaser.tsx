import Image from 'next/image';
import Link from 'next/link';
import { DrupalNode } from 'next-drupal';

import { formatDate } from '@/lib/utils';
import { responsiveImage, thumbnailLarge } from '@/lib/images';
import { Picture } from '@/components/common';
import type { FieldMediaImage } from '@/common/interfaces/field-image';

interface NodeArticleTeaserProps {
  node: DrupalNode;
}

export const NodeArticleTeaser = ({ node, ...props }: NodeArticleTeaserProps) => {
  const { field_image } = node;

  const { field_media_image } = field_image;

  const thumbnail = thumbnailLarge(field_media_image);

  console.log(node);
  return (
    <article {...props}>
      <Link href={node.path.alias} className='no-underline hover:text-blue-600'>
        <h2 className='mb-4 text-4xl font-bold'>{node.title}</h2>
      </Link>
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
        <figure className='my-4'>
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            title={thumbnail.title}
            width={thumbnail.width}
            height={thumbnail.height}
          />
        </figure>
      )}
      <Link
        href={node.path.alias}
        className='inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100'
      >
        Read article
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-4 h-4 ml-2'
        >
          <path d='M5 12h14M12 5l7 7-7 7' />
        </svg>
      </Link>
    </article>
  );
}

import Image from 'next/image';
import NextLink from 'next/link';

import {
  ArticleChipTags,
  Chip,
  PostedUserDate,
  RightArrow,
} from '@/components/common';
import { thumbnailLarge } from '@/helpers';

import type { NodeArticleTeaserProps } from './interfaces';

import styles from '@/styles/modules/nodeArticleTeaser.module.scss';

export const NodeArticleTeaser = ({ node }: NodeArticleTeaserProps) => {
  const { field_image, field_summary } = node;

  const { field_media_image } = field_image;

  const thumbnail = thumbnailLarge(
		field_media_image.links,
		field_media_image.meta,
	);

  const { field_tags } = node

  return (
    <article className={styles.article_teaser}>
      <header className={styles.article_teaser__image}>
        <div className={styles.article_teaser__image_wrapper}>
          <NextLink href={node.path.alias}>
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt}
              title={thumbnail.title}
              width={thumbnail.width}
              height={thumbnail.height}
            />
          </NextLink>
        </div>
      </header>

      <section className={styles.article_teaser__body}>
        <div className={styles.article_teaser__title}>
          <NextLink href={node.path.alias} rel='bookmark'>
            <h2>{node.title}</h2>
          </NextLink>
          <div className='article_teaser__posted'>
            <PostedUserDate
              postUser={node.uid.display_name}
              postedDate={node.created}
            />
          </div>
        </div>

        <div
          className={styles.article_teaser__text}
          dangerouslySetInnerHTML={{ __html: field_summary }}
        ></div>

        <footer className={styles.article_teaser__footer}>
          {field_tags.length && (
            <div className={styles.article_teaser__tags}>
              <ArticleChipTags tags={field_tags} />
            </div>
          )}
          <div className={styles.article_teaser__links}>
            <NextLink href={node.path.alias}>
              Read article
              <RightArrow />
            </NextLink>
          </div>
        </footer>
      </section>
    </article>
  );
};

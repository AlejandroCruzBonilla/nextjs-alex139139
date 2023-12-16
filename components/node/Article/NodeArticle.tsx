import {
  ArticleChipTags,
  Chip,
  Picture,
  PostedUserDate,
} from '@/components/common';
import { responsiveImage } from '@/helpers/images';
import { NodeArticleProps } from './interfaces';

import styles from '@/styles/modules/nodeArticle.module.scss';

export const NodeArticle = ({ node, ...props }: NodeArticleProps) => {
  const { field_image } = node;

  const { field_media_image } = field_image;

  return (
    <article {...props} className={styles.article_page}>
      <h1 className=''>{node.title}</h1>
      <PostedUserDate
        postUser={node.uid.display_name}
        postedDate={node.created}
      />
      {node.field_image && (
        <figure className={styles.article_page__image}>
          <Picture
            {...responsiveImage(
              field_media_image.uri,
              field_media_image.links,
              field_media_image.resourceIdObjMeta
            )}
          />
          {/* {field_media_image.resourceIdObjMeta.title && (
            <figcaption className=''>
              {field_media_image.resourceIdObjMeta.title}
            </figcaption>
          )} */}
        </figure>
      )}
      {node.field_tags.length > 0 && (
        <div className={styles.article_page__tags}>
          <ArticleChipTags tags={node.field_tags} />
        </div>
      )}
      {node.field_body && (
        <div dangerouslySetInnerHTML={{ __html: node.field_body }} />
      )}
    </article>
  );
};

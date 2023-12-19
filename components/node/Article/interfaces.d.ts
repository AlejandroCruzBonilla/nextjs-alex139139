import type { DrupalNode } from 'next-drupal';
import type {
  Metatag,
  FieldImage,
	FieldImageDeserialize,
  IFieldTag,
  UserID,
  PageDrupalNode,
  PaginationLinks,
} from '@/interfaces';

export interface NodeArticleTeaserProps {
  node: INodeArticleTeaser;
}

export interface INodeArticleTeaser extends DrupalNode {
  field_image: FieldImageDeserialize;
  field_summary: string;
  field_tags: IFieldTag[];
  uid: UserID;
}

export interface INodeArticleTeaserPaginate {
  nodes: INodeArticleTeaser[];
  total: number;
  paginationLinks: PaginationLinks;
}

export interface NodeArticleProps {
  node: INodeArticle;
}

export interface INodeArticle extends PageDrupalNode {
  field_image: FieldImageDeserialize;
  field_body: string;
  field_tags: IFieldTag[];
  uid: UserID;
  status: boolean;
  metatag: Metatag[];
}

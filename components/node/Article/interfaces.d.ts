import type { DrupalNode } from 'next-drupal';
import type {
  Metatag,
  FieldImage,
	FieldImageDeserialize,
  FieldTag,
  UserID,
  PageDrupalNode,
  PaginateLinks,
} from '@/interfaces';

export interface NodeArticleTeaserProps {
  node: NodeArticleTeaserInterface;
}

export interface NodeArticleTeaserInterface extends DrupalNode {
  field_image: FieldImage;
  field_summary: string;
  field_tags: FieldTag[];
  uid: UserID;
}

export interface NodeArticleTeaserPaginate {
  nodes: NodeArticleTeaserInterface[];
  total: number;
  paginationLinks: PaginateLinks;
}

export interface NodeArticleProps {
  node: NodeArticleInterface;
}

export interface NodeArticleInterface extends PageDrupalNode {
  field_image: FieldImageDeserialize;
  field_body: string;
  field_tags: FieldTag[];
  uid: UserID;
  status: boolean;
  metatag: Metatag[];
}

import type { DrupalNode } from 'next-drupal';
import type { Metatag, FieldImage, FieldTag, UserID, PageDrupalNode } from '@/interfaces';

export interface NodeArticleTeaserProps {
  node: NodeArticleTeaserInterface;
}

export interface NodeArticleTeaserInterface extends DrupalNode {
  field_image: FieldImage;
  field_summary: string;
  field_tags: FieldTag[];
  uid: UserID;
}

export interface NodeArticleProps {
  node: NodeArticleInterface;
}

export interface NodeArticleInterface extends PageDrupalNode {
  field_image: FieldImage;
  field_body: string;
  field_tags: FieldTag[];
  uid: UserID;
  status: boolean;
  metatag: Metatag[];
}

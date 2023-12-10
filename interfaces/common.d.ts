import type { DrupalNode } from 'next-drupal';

export interface PageDrupalNode extends DrupalNode{
  status: boolean;
  metatag: Metatag[];
}

export interface LinkJsonApiRef {
	href: string;
}

export interface ResourceIDObjMeta {
	drupal_internal__target_id: number;
}

export interface Links {
  describedby: LinkJsonApiRef;
  self: LinkJsonApiRef;
}

export interface Metatag {
  tag: string;
  attributes: MetatagAttributes;
}

export interface MetatagAttributes {
  name?: string;
  content?: string;
  rel?: string;
  href?: string;
  property?: string;
}

export interface Path {
  alias: string;
  pid: number;
  langcode: string;
}
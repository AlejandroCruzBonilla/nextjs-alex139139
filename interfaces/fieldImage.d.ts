import type { Meta, ResourceIDObjMeta, Links } from './common';

export interface FieldImage {
  type: string;
  id: string;
  links: Links;
  meta: Meta;
  field_media_image: FieldMediaImage;
}

export interface FieldMediaImage {
  filename: string;
  id: string;
  links: FieldMediaImageLinks;
  type: string;
  uri: FieldMediaImageUri;
  meta: FieldMediaImageMeta;
}

export interface FieldImageDeserialize {
  type: string;
  id: string;
  links: Links;
  resourceIdObjMeta: ResourceIDObjMeta;
  field_media_image: FieldMediaImageDeserialize;
}

export interface FieldMediaImageDeserialize {
  filename: string;
  id: string;
  links: FieldMediaImageLinks;
  type: string;
  uri: FieldMediaImageUri;
  resourceIdObjMeta: FieldMediaImageMeta;
}

export interface FieldMediaImageLinks extends Links {
  '1024_large': MediaStyle;
  '1280_x_large': MediaStyle;
  '1440_2x_large': MediaStyle;
  '480_x_small': MediaStyle;
  '640_small': MediaStyle;
  '768_medium': MediaStyle;
  thumbnail: MediaStyle;
  thumbnail_large: MediaStyle;
  thumbnail_medium: MediaStyle;
}

export interface MediaStyle {
  href: string;
  meta: MediaStyleMeta;
}

export interface MediaStyleMeta {
  linkParams: MediaStyleMetaLinkParams;
  rel: string[];
}

export interface MediaStyleMetaLinkParams {
  width: string;
  height: string;
  rel: string[];
}

export interface FieldMediaImageMeta extends Meta {
  alt: string;
  title: string;
  width: number;
  height: number;
  imageDerivatives: ImageDerivatives;
}

export interface ImageDerivatives {
  links: { [key: string]: ImageDerivativeLink };
}

export interface ImageDerivativeLink {
  href: string;
  title: string;
  meta: ImageDerivativeLinkMeta;
  rel: string;
}

export interface ImageDerivativeLinkMeta {
  rel: string;
}

export interface FieldMediaImageUri {
  value: string;
  url: string;
}

import type { LinkJsonApiRef, ResourceIDObjMeta, Links } from './common';

export interface FieldImage {
  field_media_image: FieldMediaImage;
}

export interface FieldMediaImage {
  type: string;
  id: string;
  filename: string;
  uri: FieldMediaImageUri;
  filemime: string;
  links: MediaLinks;
  resourceIdObjMeta: MediaResourceIDObjMeta;
}

export interface MediaLinks extends Links {
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

interface MediaStyle {
  href: string;
  meta: MediaStyleMeta;
}

interface MediaStyleMeta {
  linkParams: MediaStyleMetaLinkParams;
  rel: string[];
}

interface MediaStyleMetaLinkParams {
  width: string;
  height: string;
  rel: string[];
}

interface MediaResourceIDObjMeta extends ResourceIDObjMeta {
  alt: string;
  title: string;
  width: number;
  height: number;
  imageDerivatives: ImageDerivatives;
}

interface ImageDerivatives {
  links: { [key: string]: ImageDerivativeLink };
}

interface ImageDerivativeLink {
  href: string;
  title: string;
  meta: ImageDerivativeLinkMeta;
  rel: string;
}

interface ImageDerivativeLinkMeta {
  rel: string;
}

interface FieldMediaImageUri {
  value: string;
  url: string;
}

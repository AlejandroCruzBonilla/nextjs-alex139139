import { absoluteUrl } from './utils';

import type {
  FieldMediaImage,
  MediaStyle,
  Links,
  ImageDerivatives,
} from '@/common/interfaces';


export const responsiveImage = ({
  uri,
  links,
  resourceIdObjMeta,
}: FieldMediaImage) => {
  const { alt, title, height, width, imageDerivatives } = resourceIdObjMeta;

  return {
    alt,
    height,
    sources: getSources(links, imageDerivatives, 450),
    title,
    url: absoluteUrl(uri.url),
    width,
  };
};

export const thumbnailLarge = ({ links, resourceIdObjMeta }: FieldMediaImage) => {
  const { alt, title } = resourceIdObjMeta;

  const {
    href,
    meta: {
      linkParams: { height, width },
    },
  } = links.thumbnail_large;

  return {
    alt,
    height: Number(height),
    src: removeParams(href),
    title,
    width: Number(width),
  };
};

const getSources = (
  links: Links,
  imageDerivatives: ImageDerivatives,
  defaultMedia: number
) => {
  const sources = Object.keys(imageDerivatives.links).map(key => {
    const {
      href,
      meta: { linkParams },
    } = links[key] as MediaStyle;
    const { width, height } = linkParams;

    const media =
      Number(width) === defaultMedia
        ? `(max-width: 479px)`
        : `(min-width: ${width}px)`;

    return {
      height,
      media,
      srcSet: removeParams(href),
      type: 'image/' + getImageExtension(href),
      width,
    };
  });

  const sortSources = sources.sort((a, b) => {
    const valueA = getPxValue(a.media);
    const valueB = getPxValue(b.media);
    return valueB - valueA;
  });

  return sortSources;
};

const getPxValue = (media: string) => {
  const match = media.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

const removeParams = (url: string) => {
  const index = url.indexOf('?');
  return index !== -1 ? url.substring(0, index) : url;
};

const getImageExtension = (url: string) => {
  const cleanUrl = removeParams(url);
  const match = cleanUrl.match(/\.(\w+)$/);
  return match ? match[1] : null;
};

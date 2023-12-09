export interface PictureProps {
  alt: string;
  height: number;
  priority?: 'eager' | 'lazy';
  sources: Source[];
  title: string;
  url: string;
  width: number;
}

type Source = {
  height: string;
  media: string;
  srcSet: string;
  type: string;
  width: string;
};
import NextImage, { ImageLoader, ImageProps } from 'next/image';

const loader =
  (origin: string): ImageLoader =>
  ({ src, width, quality }) =>
    `https://sharpify.vercel.app/p?src=${origin}${src}&q=${quality || 80}&w=${width}`;

export const Image = (props: ImageProps) => {
  let origin = '';
  if (typeof window !== 'undefined') {
    origin = window.location.origin;
  }
  const dev = process.env.NODE_ENV === 'development';
  const customProps = dev
    ? {
        unoptimized: true,
      }
    : {
        loader: loader(origin),
      };

  return <NextImage {...props} {...customProps} />;
};

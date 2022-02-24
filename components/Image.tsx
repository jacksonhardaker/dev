import NextImage, { ImageLoader, ImageProps } from 'next/image';
import { useMemo } from 'react';

const loader: ImageLoader = ({ src, width, quality }) =>
  `https://sharpify.vercel.app/p?src=${
    process.env.NEXT_PUBLIC_ORIGIN
  }${src}&q=${quality || 80}&w=${width}`;

export const Image = (props: ImageProps) => {
  const customProps = useMemo(() => {
    return process.env.NODE_ENV === 'development'
      ? {
          unoptimized: true,
        }
      : {
          loader,
        };
  }, []);

  return <NextImage {...props} {...customProps} />;
};

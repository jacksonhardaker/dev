import { useState, useEffect, useRef } from 'react';
import classes from 'classnames';

const BlogCoverImage = ({ dimensions = {}, url, alt, main2x, mobile, blur }) => {
  const mainSrcEl = useRef(null);
  const mobileSrcEl = useRef(null);
  const [loading, setLoading] = useState(true);
  const [mainSrcSet, setMainSrcSet] = useState("");
  const [mobileSrcSet, setMobileSrcSet] = useState("");
  const { width, height } = dimensions;

  useEffect(() => {
    setMainSrcSet(mainSrcEl.current.dataset.srcset);
    setMobileSrcSet(mobileSrcEl.current.dataset.srcset);
  }, [mainSrcEl, mobileSrcEl]);

  useEffect(() => {
    if (mainSrcSet && mobileSrcSet) {
      setLoading(false);
    }
  }, [mainSrcSet, mobileSrcSet]);

  return (
    <figure itemProp="image" itemScope itemType="https://schema.org/ImageObject">
      <picture>
        <source ref={mainSrcEl} srcSet={mainSrcSet} media="(min-width: 341px)" data-srcset={`${url}, ${main2x.url} 2x`} />
        <source ref={mobileSrcEl} srcSet={mobileSrcSet} media="(max-width: 340px)" data-srcset={`${mobile.url}, ${url} 2x`} />
        <img className={classes({ loading })} src={blur.url} alt={alt} />
      </picture>
      <meta itemProp="url" content={url} />
      <meta itemProp="width" content={width} />
      <meta itemProp="height" content={height} />
      <style jsx>{`
        figure {
          margin: 1rem 0;
        }
        img {
          display: block;
          width: 100%;
          transition: filter 0.1s linear, transform 0.1s linear;
        }
        img.loading {
          filter: blur(12px);
          transform: scale(1.03);
        }
        picture {
          display: inline-block;
          width: 100%;
          overflow: hidden;
        }
      `}</style>
    </figure>
  );
};

export default BlogCoverImage;

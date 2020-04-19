import React from 'react';
import { black, primary } from '../constants/colors';

const Base64SVG = ({ stream }) => {

  if (!window.atob)
    return null;

  const html = {
    __html: atob(stream.substring(26))
  };

  return (
    <>
      <i dangerouslySetInnerHTML={html}></i>
      <style jsx>{`
        i {
          fill: ${black};
          display: block;
        }

        i:hover {
          fill: ${primary}
        }
      `}</style>
    </>
  )
}

export default Base64SVG;

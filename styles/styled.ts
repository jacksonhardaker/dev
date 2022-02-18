import md5 from 'md5';
import kebabCase from 'kebab-case';

export const styled = (styles) => {
  const hash = md5(JSON.stringify(styles));
  const classNames = Object.keys(styles).reduce(
    (acc, className) => ({ ...acc, [className]: `${className}-${hash}` }),
    {}
  );

  const stylesString = Object.entries(styles)
    .map(
      ([className, properties]) =>
        `.${classNames[className]} {${Object.entries(properties)
          .map(([key, value]) => `${kebabCase(key)}: ${value}`)
          .join(';')}}`
    )
    .join('\n');

  return { classNames, styles: stylesString };
};

export default styled;

import type { CSSProperties } from 'react';
import md5 from 'md5';
import kebabCase from 'kebab-case';

const PSEUDO_CLASSES = [':hover', ':focus'] as const;
type PseudoClass = Partial<
  Record<typeof PSEUDO_CLASSES[number], CSSProperties>
>;

const omit = (obj: CSSProperties & PseudoClass, keys: string[]) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      !keys.includes(key) ? { ...acc, [key]: value } : acc,
    {}
  );
};

const pick = (obj: CSSProperties & PseudoClass, keys: string[]) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      keys.includes(key) ? { ...acc, [key]: value } : acc,
    {}
  );
};

const stringifyProperties = (properties: CSSProperties) =>
  Object.entries(properties)
    .map(([key, value]) => `${kebabCase(key)}:${value}`)
    .join(';');

export const styled = <T extends string>(
  styles: Record<T, CSSProperties & PseudoClass>
) => {
  const hash = md5(JSON.stringify(styles));
  const classNames = Object.keys(styles).reduce<Record<T, string>>(
    (acc, className) => ({ ...acc, [className]: `${className}-${hash}` }),
    {} as Record<T, string>
  );

  const stylesArr = Object.entries(styles).reduce(
    (acc, [key, value]: [T, CSSProperties & PseudoClass]) => {
      const properties = omit(value, [...PSEUDO_CLASSES]);
      const pseudoClasses = pick(value, [...PSEUDO_CLASSES]);

      let additions = [];

      if (Object.keys(properties).length > 0) {
        additions.push(
          `.${classNames[key]} {${stringifyProperties(properties)}}`
        );
      }

      if (Object.keys(pseudoClasses).length > 0)
        Object.entries(pseudoClasses).forEach(([pseudoKey, pseudoValue]) => {
          additions.push(
            `.${classNames[key]}${pseudoKey} {${stringifyProperties(
              pseudoValue
            )}}`
          );
        });

      return [...acc, additions];
    },
    []
  );

  return { classNames, styles: stylesArr.join('\n') };
};

export default styled;

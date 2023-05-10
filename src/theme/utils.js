import { tokens } from './tokens';

export const getColor = (colorNameAndVariant) => {
  if (colorNameAndVariant.includes('/')) {
    let [colorName, colorVariant] = colorNameAndVariant.split('/');
    return tokens.global.Foundation[colorName][colorVariant].value;
  } else {
    return tokens.global[colorNameAndVariant].value;
  }
};

/* 사용예시
    global color: getColor('primary color')
    foundation color: getColor('primary Yellow/primary yellow-100')
*/

// export const getFontSize = (FontSizeAndVariant) => {
//   return tokens.fontSize[FontSizeAndVariant];
// };

import { BackgroundColorType, BorderColorType, ShadowType } from '../../../types';
import { BorderSizeType } from '../types';

import styles from '../index.module.css';

export const getClasses = (
    backgroundColor: BackgroundColorType | string | undefined,
    borderColor: BorderColorType | undefined,
    borderSize: BorderSizeType | undefined,
    shadow: ShadowType | undefined,
) => ({
    [styles[`background-${backgroundColor}`]]: backgroundColor,
    [styles[`border-color-${borderColor}`]]: borderColor,
    [styles[`border-width-${borderSize}`]]: borderSize,
    [styles[`${shadow}`]]: shadow,
});

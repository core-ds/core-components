import type { BorderColorType, ShadowType } from '@balafla/core-components-types';

import { BACKGROUND } from '../constants';
import type { BorderSizeType } from '../types';

import styles from '../index.module.css';

export const isBackgroundToken = (token: string | undefined) => token && BACKGROUND.includes(token);

export const getClasses = (
    backgroundColor: string | undefined,
    borderColor: BorderColorType | undefined,
    borderSize: BorderSizeType | undefined,
    shadow: ShadowType | undefined,
) => ({
    [styles[`background-${backgroundColor}`]]: isBackgroundToken(backgroundColor),
    [styles[`border-color-${borderColor}`]]: borderColor,
    [styles[`border-width-${borderSize}`]]: borderSize,
    [styles[`${shadow}`]]: shadow,
});

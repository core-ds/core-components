import { TYPOGRAPHY_COLOR } from '../consts';
import { type TypographyColor } from '../types/typography-color';

export const isTypographyColor = (color: TypographyColor | string): color is TypographyColor =>
    TYPOGRAPHY_COLOR.includes(color);

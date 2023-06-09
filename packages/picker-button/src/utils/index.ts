import { FC, SVGProps } from 'react';

import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';
import { MoreSIcon } from '@alfalab/icons-glyph/MoreSIcon';

import { PickerButtonSize, PickerButtonVariant } from '../types';

export const getIcon = (
    variant: PickerButtonVariant,
    size: PickerButtonSize,
): FC<SVGProps<SVGSVGElement>> => {
    if (variant === 'compact') {
        return size === 'xxs' ? MoreSIcon : MoreMIcon;
    }

    return size === 'xxs' ? ChevronDownCompactSIcon : ChevronDownMIcon;
};

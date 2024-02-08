import { FC, SVGProps } from 'react';

import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';
import { MoreSIcon } from '@alfalab/icons-glyph/MoreSIcon';

import { PickerButtonVariant } from '../types';

export const getIcon = (
    variant: PickerButtonVariant,
    size: string,
): FC<SVGProps<SVGSVGElement>> => {
    if (variant === 'compact') {
        return size === 'size-32' ? MoreSIcon : MoreMIcon;
    }

    return ['size-40', 'size-32'].includes(size) ? ChevronDownCompactSIcon : ChevronDownMIcon;
};

import { ComponentType, SVGProps } from 'react';

import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';
import { MoreSIcon } from '@alfalab/icons-glyph/MoreSIcon';

import { PickerButtonVariant } from '../types';

export const getCompactIcon = (size: string, Icon?: ComponentType<SVGProps<SVGSVGElement>>) => {
    if (Icon) {
        return Icon;
    }

    return size === 'size-32' ? MoreSIcon : MoreMIcon;
};

export const getIcon = (
    variant: PickerButtonVariant,
    size: string,
    Icon?: ComponentType<SVGProps<SVGSVGElement>>,
): ComponentType<SVGProps<SVGSVGElement>> => {
    if (variant === 'compact') {
        return getCompactIcon(size, Icon);
    }

    return ['size-40', 'size-32'].includes(size) ? ChevronDownCompactSIcon : ChevronDownMIcon;
};

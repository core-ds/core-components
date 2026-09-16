import React, { type ComponentType, type SVGProps } from 'react';

import { Icon20Adapter } from '@alfalab/core-components-shared';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { DotsThreeHorizontalLine20Icon } from '@alfalab/icons-glyph-26/DotsThreeHorizontalLine20Icon';
import { DotsThreeHorizontalLine24Icon } from '@alfalab/icons-glyph-26/DotsThreeHorizontalLine24Icon';

import { type PickerButtonVariant } from '../types';

const DotsThreeHorizontalLine20AdapterIcon = (props: SVGProps<SVGSVGElement>) => (
    <Icon20Adapter icon={DotsThreeHorizontalLine20Icon} {...props} />
);

export const getCompactIcon = (size: string, Icon?: ComponentType<SVGProps<SVGSVGElement>>) => {
    if (Icon) {
        return Icon;
    }

    if (size === 'size-32') {
        return DotsThreeHorizontalLine20AdapterIcon;
    }

    return DotsThreeHorizontalLine24Icon;
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

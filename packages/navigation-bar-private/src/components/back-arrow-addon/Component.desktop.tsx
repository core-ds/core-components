import React from 'react';

import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { type BackArrowAddonProps, BackArrowAddonBase } from './Component';

import stylesButton from './button.desktop.module.css';
import stylesIcon from './icon.desktop.module.css';

export const BackArrowAddonDesktop = ({ ...props }: BackArrowAddonProps) => (
    <BackArrowAddonBase
        {...props}
        ButtonDesktopProps={{
            size: 's',
            className: stylesButton.component,
        }}
        iconWrapperProps={{
            className: stylesIcon.iconWrapper,
        }}
        TypographyTextProps={{
            view: 'primary-large',
            className: stylesIcon.text,
        }}
        Icon={ArrowLeftMediumMIcon}
    />
);

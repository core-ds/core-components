import React from 'react';
import cn from 'classnames';

import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';

import { type BackArrowAddonProps, BackArrowAddonBase } from './Component';

import stylesButton from './button.mobile.module.css';
import stylesIcon from './icon.mobile.module.css';

export const BackArrowAddonMobile = ({ ...props }: BackArrowAddonProps) => (
    <BackArrowAddonBase
        {...props}
        ButtonDesktopProps={{
            size: 'xxs',
            className: cn(
                stylesButton.component,
                // TODO удалить, оставлен для сохранение snapshot
                stylesButton.mobileComponent,
            ),
        }}
        iconWrapperProps={{
            className: cn(
                stylesIcon.iconWrapper,
                // TODO удалить, оставлен для сохранение snapshot
                stylesIcon.mobileWrapper,
            ),
        }}
        TypographyTextProps={{
            view: 'component',
            className: stylesIcon.text,
        }}
        Icon={ArrowLeftMIcon}
    />
);

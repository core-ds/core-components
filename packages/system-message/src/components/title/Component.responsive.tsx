import React, { useContext } from 'react';

import { SystemMessageContext } from '../../Context';

import { TitleDesktop } from './desktop/Component.desktop';
import { TitleMobile } from './mobile/Component.mobile';
import { type TitleProps } from './Component';

export const TitleResponsive = ({ children, ...props }: TitleProps) => {
    const { view } = useContext(SystemMessageContext);

    const Title = view === 'desktop' ? TitleDesktop : TitleMobile;

    return <Title {...props}>{children}</Title>;
};

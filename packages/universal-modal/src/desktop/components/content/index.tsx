import React, { type FC } from 'react';

import { BaseContent, type ContentProps } from '../../../components/base-content';

export type ContentDesktopProps = ContentProps;

export const ContentDesktop: FC<ContentDesktopProps> = ({ className, ...restProps }) => {
    return <BaseContent className={className} {...restProps} />;
};

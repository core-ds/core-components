import React, { FC } from 'react';
import { TempBlock, TempBlockProps } from './component';

export type TempBlockMobileProps = TempBlockProps;

export const TempBlockMobile: FC<TempBlockMobileProps> = ({ mobile, ...restProps }) => (
    <TempBlock mobile={true} {...restProps} />
);

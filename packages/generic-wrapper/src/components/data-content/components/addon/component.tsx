import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Gap, GapProps } from '@alfalab/core-components-gap';

import styles from './index.module.css';

export type JustifyContentType = 'center' | 'start' | 'end' | 'between' | 'around';

export type LeftSideOptions = {
    content: ReactNode;
    rowLimit?: 1 | 2 | 3 | 4;
    justifyContent?: JustifyContentType;
};

export type RightSideOptions = {
    content: ReactNode;
    justifyContent?: JustifyContentType;
    gapSize?: GapProps['size'];
};

export type AddonProps = {
    leftSide: LeftSideOptions;
    rightSide?: RightSideOptions;
    alignItems?: 'center' | 'end' | 'start';
};

export const Addon = ({ leftSide, rightSide, alignItems }: AddonProps) => {
    const justifyContentStyles =
        leftSide.justifyContent && styles[`justify-content-${leftSide.justifyContent}`];
    const rowLimitStyles = leftSide.rowLimit && styles[`row-limit-${leftSide.rowLimit}`];
    const alignItemsStyles = alignItems && styles[`align-${alignItems}`];

    return (
        <div className={cn(styles.component, alignItemsStyles)}>
            <div className={cn(styles.leftSide, justifyContentStyles, rowLimitStyles)}>
                {leftSide.content}
            </div>
            {rightSide?.gapSize && <Gap size={rightSide.gapSize} direction='horizontal' />}
            {rightSide && <div className={cn(styles.rightSide)}>{rightSide.content}</div>}
        </div>
    );
};

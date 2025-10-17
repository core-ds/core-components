import React, { useId } from 'react';
import cn from 'classnames';

import { type BaseFilterButtonProps, type TMaskVariant } from '../../types';

import { resolveMaskConfig } from './utils';

import styles from './index.module.css';

interface MaskedContentProps
    extends Pick<BaseFilterButtonProps, 'className' | 'size' | 'pathMask' | 'children'> {
    variant: TMaskVariant;
}

export const MaskedContent = ({
    className,
    variant,
    size,
    pathMask,
    children,
}: MaskedContentProps) => {
    const clipId = useId();
    const sizeViewBox = size === 40 ? '0 0 40 40' : '0 0 40 32';
    const { d } = resolveMaskConfig({ size, variant, preferredMask: pathMask });

    return (
        <svg width={40} height={size} viewBox={sizeViewBox} focusable={false} aria-hidden={true}>
            <defs>
                <clipPath id={clipId} clipPathUnits='userSpaceOnUse'>
                    <path d={d} />
                </clipPath>
            </defs>

            <foreignObject x='0' y='0' width='40' height={size} clipPath={`url(#${clipId})`}>
                <div className={cn(styles.maskedInner, styles.bgLayer, className)}>{children}</div>
            </foreignObject>
        </svg>
    );
};

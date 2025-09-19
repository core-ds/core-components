import React, { type FC } from 'react';
import cn from 'classnames';

import { useId } from '@alfalab/hooks';

import { type StatusControlProps } from '../types';

import styles from './index.module.css';

export const LoadingSpinner: FC<StatusControlProps> = ({
    className,
    size,
    strokeDasharray,
    strokeDashoffset,
    strokeWidth,
}) => {
    const uniqId = useId();
    const radius = size / 2 - strokeWidth / 2;
    const rotationAngle = Math.ceil((Math.asin(strokeWidth / 2 / radius) * 180) / Math.PI);

    const gradient = `conic-gradient(from ${rotationAngle}deg, transparent ${
        90 - rotationAngle * 2
    }deg, currentColor)`;

    return (
        <svg
            className={cn(className, styles.loading)}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <defs>
                <mask id={`spinner-mask-${uniqId}`}>
                    <path
                        d='M28 1C32.7738 1 36.7752 1.34174 40.0029 1.80371C47.4798 2.87385 53.1262 8.52019 54.1963 15.9971C54.6583 19.2248 55 23.2262 55 28C55 32.7738 54.6583 36.7752 54.1963 40.0029C53.1262 47.4798 47.4798 53.1262 40.0029 54.1963C36.7752 54.6583 32.7738 55 28 55C23.2262 55 19.2248 54.6583 15.9971 54.1963C8.5202 53.1262 2.87385 47.4798 1.80371 40.0029C1.34175 36.7752 1 32.7738 1 28C1 23.2262 1.34174 19.2248 1.80371 15.9971C2.87385 8.5202 8.5202 2.87385 15.9971 1.80371C19.2248 1.34174 23.2262 1 28 1Z'
                        stroke='#fff'
                        strokeWidth={strokeWidth}
                        strokeLinecap='square'
                        fill='none'
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                    />
                </mask>
            </defs>
            <foreignObject
                x='-8'
                y='-8'
                width={72}
                height={72}
                mask={`url(#spinner-mask-${uniqId})`}
            >
                <div className={styles.gradient} style={{ backgroundImage: gradient }} />
            </foreignObject>
        </svg>
    );
};

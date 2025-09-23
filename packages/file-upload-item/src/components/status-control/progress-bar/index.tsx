import React, { type FC } from 'react';

import { useId } from '@alfalab/hooks';

interface ProgressBarProps {
    className: string;
    strokeDasharray: number;
    strokeDashoffset: number;
    strokeWidth?: number;
    stroke?: string;
    size?: number;
    isIndeterminate?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
    const {
        className,
        size = 56,
        stroke = '#babbc2',
        strokeDasharray,
        strokeDashoffset = 0,
        strokeWidth = 2,
        isIndeterminate = false,
    } = props;

    const uniqId = useId();

    const spinnerDefs = (
        <defs>
            <linearGradient
                id={`spinner-gradient-${uniqId}`}
                x1='0%'
                y1='0%'
                x2='0%'
                y2='100%'
                gradientUnits='objectBoundingBox'
                gradientTransform='rotate(0)'
            >
                <stop offset='0%' stopColor={stroke} stopOpacity='0' />
                <stop offset='100%' stopColor={stroke} stopOpacity='1' />
                <animateTransform
                    attributeName='gradientTransform'
                    attributeType='XML'
                    type='rotate'
                    values='0 0.5 0.5;360 0.5 0.5'
                    dur='2s'
                    repeatCount='indefinite'
                    begin='0s'
                    calcMode='linear'
                />
            </linearGradient>
        </defs>
    );

    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            {isIndeterminate && spinnerDefs}
            <path
                d='M28 1C32.7738 1 36.7752 1.34174 40.0029 1.80371C47.4798 2.87385 53.1262 8.52019 54.1963 15.9971C54.6583 19.2248 55 23.2262 55 28C55 32.7738 54.6583 36.7752 54.1963 40.0029C53.1262 47.4798 47.4798 53.1262 40.0029 54.1963C36.7752 54.6583 32.7738 55 28 55C23.2262 55 19.2248 54.6583 15.9971 54.1963C8.5202 53.1262 2.87385 47.4798 1.80371 40.0029C1.34175 36.7752 1 32.7738 1 28C1 23.2262 1.34174 19.2248 1.80371 15.9971C2.87385 8.5202 8.5202 2.87385 15.9971 1.80371C19.2248 1.34174 23.2262 1 28 1Z'
                stroke={isIndeterminate ? `url(#spinner-gradient-${uniqId})` : stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={isIndeterminate ? 0 : strokeDashoffset}
            />
        </svg>
    );
};

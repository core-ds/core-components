import React, { type FC } from 'react';

type Props = {
    className: string;
    strokeDasharray: number;
    strokeDashoffset: number;
};

export const ProgressBar: FC<Props> = (props) => {
    const { className, strokeDasharray, strokeDashoffset } = props;

    return (
        <svg
            className={className}
            width='56'
            height='56'
            viewBox='0 0 56 56'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M28 1C32.7738 1 36.7752 1.34174 40.0029 1.80371C47.4798 2.87385 53.1262 8.52019 54.1963 15.9971C54.6583 19.2248 55 23.2262 55 28C55 32.7738 54.6583 36.7752 54.1963 40.0029C53.1262 47.4798 47.4798 53.1262 40.0029 54.1963C36.7752 54.6583 32.7738 55 28 55C23.2262 55 19.2248 54.6583 15.9971 54.1963C8.5202 53.1262 2.87385 47.4798 1.80371 40.0029C1.34175 36.7752 1 32.7738 1 28C1 23.2262 1.34174 19.2248 1.80371 15.9971C2.87385 8.5202 8.5202 2.87385 15.9971 1.80371C19.2248 1.34174 23.2262 1 28 1Z'
                stroke='#babbc2'
                strokeWidth='2'
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
            />
        </svg>
    );
};

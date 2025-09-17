import React, { type FC, type SVGProps } from 'react';

export const CheckIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width='10' height='8' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10 1.5 3.5 8 0 4.5 1.5 3l2 2 5-5L10 1.5Z'
            fillOpacity='.94'
        />
    </svg>
);

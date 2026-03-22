import React, { type ButtonHTMLAttributes, forwardRef } from 'react';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ children, onClick, ...rest }, ref) => (
        <button ref={ref} type='button' {...rest} onClick={onClick}>
            {children}
        </button>
    ),
);

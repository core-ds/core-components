import React, { type FC, type SVGProps } from 'react';

export const DefaultLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        role='img'
        focusable='false'
        fill='currentColor'
        width='18'
        height='24'
        viewBox='0 0 18 24'
        {...props}
    >
        <path
            d='M9.103 2c-1.485 0-1.946.879-2.342 2l-4.08 11.557h2.706l.942-2.747h5.206l.873 2.747h2.877L11.397 4c-.376-1.117-.81-2-2.294-2zm-.071 3.01h-.069l-1.85 5.479h3.665L9.032 5.01zM15.593 22H2.407v-2.73h13.186V22z'
            fillRule='evenodd'
            clipRule='evenodd'
        />
    </svg>
);

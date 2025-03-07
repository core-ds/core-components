/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export const CustomizedHOC = (Component: any, options: any) => {
    const NewComponent = (props: any) => <Component {...props} {...options} />;

    return NewComponent;
};

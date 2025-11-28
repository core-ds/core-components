/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export const CustomizedHOC = (Component: any, options: any) => (props: any) => {
    const { key, ref, ...rest } = props;

    return <Component key={key} ref={ref} {...rest} {...options} />;
};

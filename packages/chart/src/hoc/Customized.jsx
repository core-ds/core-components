import React from 'react';

export const CustomizedHOC = (Component, options) => {
    const NewComponent = props => <Component {...props} {...options} />;

    return NewComponent;
};

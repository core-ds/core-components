import React from 'react';

type WrapperProps = {
    header?: string;
    description?: string;
};

export const Wrapper: React.FC<WrapperProps> = ({ children, description, header }) => {
    return (
        <React.Fragment>
            {header && <h3 className='wrapper-header'>{header}</h3>}
            {description && <p className='wrapper-description'>{description}</p>}
            <div className='wrapper-component'>{children}</div>
        </React.Fragment>
    );
};

import React from 'react';
import { getComponent } from './components';
import { parseKnobs, getQueryParam } from './utils';

export const Screenshots = () => {
    const Component = getComponent(
        getQueryParam('package'),
        getQueryParam('component'),
        getQueryParam('subComponent'),
    );

    const props = parseKnobs();

    const invertedBg = getQueryParam('inverted', true) || (props as any).colors === 'inverted';

    return (
        <div
            style={{
                backgroundColor: invertedBg
                    ? 'var(--color-light-bg-primary-inverted)'
                    : 'transparent',
            }}
        >
            {Component ? <Component {...props} /> : null}
        </div>
    );
};

export default {
    title: 'Components',
};

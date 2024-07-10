import React from 'react';
import { getComponent } from './components';
import { parseKnobs, getQueryParam, stylesStringToObj } from './utils';
import { ModeChecker } from 'storybook/components/mode-checker';

export const Screenshots = () => {
    const Component = getComponent(
        getQueryParam('package'),
        getQueryParam('component'),
        getQueryParam('subComponent'),
    );

    const props = parseKnobs() as any;

    const invertedBg = getQueryParam('inverted', true) || props.colors === 'inverted';

    return (
        <div
            style={{
                backgroundColor: invertedBg
                    ? 'var(--color-light-base-bg-primary-inverted)'
                    : 'transparent',
                ...stylesStringToObj(getQueryParam('wrapperStyles')),
            }}
        >
            <ModeChecker />
            {Component ? <Component {...props} /> : null}
        </div>
    );
};

export default {
    title: 'Components',
};

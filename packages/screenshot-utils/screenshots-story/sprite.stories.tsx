import React, { CSSProperties } from 'react';
import { combosToProps, generateCombos } from '../utils';
import { getComponent } from './components';
import { getQueryParam, isJsonObj } from './utils';

import styles from './sprite.stories.module.css';

const propsToTitle = (props) => {
    const { children, ...restProps } = props;
    return JSON.stringify(restProps).replace(/[{}"]/g, '').replace(/,/g, ', ');
};

export const ScreenshotsSprite = () => {
    const knobs = getQueryParam('knobs') ? JSON.parse(getQueryParam('knobs')) : {};

    const combos = generateCombos(Object.values(knobs).map((v) => (Array.isArray(v) ? v : [v])));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ids = combos.map((combo) => combo.map(([_, valueIndex]) => valueIndex).join('-'));

    const propsList = combosToProps(combos, Object.keys(knobs));

    const Component = getComponent(
        getQueryParam('package'),
        getQueryParam('component'),
        getQueryParam('subComponent'),
    );

    const componentStyles: CSSProperties = {};
    componentStyles.width = +getQueryParam('width') || undefined;
    componentStyles.height = +getQueryParam('height') || undefined;

    const mockDate = +getQueryParam('mockDate');

    if (mockDate) {
        Date.now = () => mockDate;
    }

    if (!Component) return null;

    return (
        <div className={styles.container}>
            {propsList.map((props, index) => {
                const parsedProps = Object.keys(props).reduce((acc, key) => {
                    if (isJsonObj(props[key])) {
                        acc[key] = JSON.parse(props[key] as string);
                    } else {
                        acc[key] = props[key];
                    }

                    return acc;
                }, {} as Record<string, unknown>);

                const invertedBg =
                    getQueryParam('inverted', true) || (parsedProps as any).colors === 'inverted';

                return (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className={styles.item}
                    >
                        <span className={styles.title}>{propsToTitle(parsedProps)}</span>
                        <div
                            id={ids[index]}
                            style={{
                                ...componentStyles,
                                backgroundColor: invertedBg
                                    ? 'var(--color-light-bg-primary-inverted)'
                                    : 'transparent',
                            }}
                        >
                            <Component {...parsedProps} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default {
    title: 'Components',
};

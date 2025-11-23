import React, { createRef, type FC, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import { type PageIndicatorBulletProps } from '../../types';

import { calcParams } from './utils';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';
import staticColors from './static.module.css';
import staticInvertedColors from './static-inverted.module.css';

const colorsStyle = {
    inverted: invertedColors,
    default: defaultColors,
    static: staticColors,
    'static-inverted': staticInvertedColors,
} as const;

const transitionClassess = {} as const;

export const PageIndicatorBullet: FC<PageIndicatorBulletProps> = ({
    elements: count = 10,
    activeElement: activeElementIndex,
    size = 8,
    gap = 8,
    colors = 'default',
}) => {
    const refs = useMemo(
        () => Array.from({ length: count }, () => createRef<HTMLLIElement>()),
        [count],
    );
    const [height, width, offset, elementSize, firstVisibleElementIndex, lastVisibleElementIndex] =
        useMemo(
            () => calcParams(size, gap, activeElementIndex, count),
            [activeElementIndex, count, gap, size],
        );

    return (
        <div className={cn(styles.pageIndicator, styles.bullet)} style={{ height, width }}>
            <ol
                className={styles.elementsList}
                style={{ gap, transform: `translate(${offset}px)` }}
            >
                {refs.map((ref, index) => {
                    const sizeOfElement = elementSize(index);
                    const isActive = activeElementIndex === index;
                    const isVisible =
                        firstVisibleElementIndex <= index && index <= lastVisibleElementIndex;
                    const addListTransitionEndListener = (done: () => void) => {
                        const parentElement = ref.current?.parentElement;

                        parentElement?.addEventListener('transitionend', done, { once: true });
                    };

                    return (
                        <CSSTransition
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            nodeRef={ref}
                            addEndListener={addListTransitionEndListener}
                            in={isVisible}
                            // passed empty object so any classes aren't added
                            classNames={transitionClassess}
                        >
                            {(status) => (
                                <li
                                    ref={ref}
                                    data-index={index}
                                    className={cn(
                                        styles.element,
                                        colorsStyle[colors].element,
                                        { [colorsStyle[colors].active]: isActive },
                                        styles[status],
                                    )}
                                    style={{ height: sizeOfElement, width: sizeOfElement }}
                                />
                            )}
                        </CSSTransition>
                    );
                })}
            </ol>
        </div>
    );
};

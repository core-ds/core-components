import React, { createRef, FC, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import { PageIndicatorBulletProps } from '../../types';

import { calcParams } from './utils';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorsStyle = {
    inverted: invertedColors,
    default: defaultColors,
} as const;

const transitionClassess = {} as const;
const transitionTimeout = { enter: 200, exit: 0 } as const;

export const PageIndicatorBullet: FC<PageIndicatorBulletProps> = ({
    elements: elementsCount = 10,
    activeElement: activeElementIndex,
    size = 8,
    gap = 8,
    colors = 'default',
}) => {
    const items = useMemo(
        () =>
            Array.from({ length: elementsCount }, (_, key) => ({
                key,
                nodeRef: createRef<HTMLLIElement>(),
            })),
        [elementsCount],
    );

    const [height, width, offset, elementSize, firstVisibleElementIndex, lastVisibleElementIndex] =
        useMemo(
            () => calcParams(size, gap, activeElementIndex, elementsCount),
            [activeElementIndex, elementsCount, gap, size],
        );

    return (
        <div className={cn(styles.pageIndicator, styles.bullet)} style={{ height, width }}>
            <ol
                className={styles.elementsList}
                style={{ gap, transform: `translate(${offset}px)` }}
            >
                {items.map(({ key, nodeRef }, index) => {
                    const sizeOfElement = elementSize(index);
                    const isActive = activeElementIndex === index;
                    const isVisible =
                        firstVisibleElementIndex <= index && index <= lastVisibleElementIndex;
                    const addListTransitionEndListener = (done: () => void) => {
                        const parentElement = nodeRef.current?.parentElement;

                        parentElement?.addEventListener('transitionend', done, { once: true });
                    };

                    return (
                        <CSSTransition
                            key={key}
                            nodeRef={nodeRef}
                            addEndListener={addListTransitionEndListener}
                            timeout={transitionTimeout}
                            in={isVisible}
                            // passed empty object so any classes aren't added
                            classNames={transitionClassess}
                        >
                            {(status) => (
                                <li
                                    ref={nodeRef}
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

import React, { type ReactNode } from 'react';
import { Transition } from 'react-transition-group';

import { type HeadlessCollapseProps } from '@alfalab/core-components-headless-collapse/types';
import {
    capitalize,
    defaultGetDimensionValue,
} from '@alfalab/core-components-headless-collapse/utils';
import { triggerReflow } from '@alfalab/core-components-shared';

export function HeadlessCollapse<T extends HTMLElement>({
    in: inProp,
    nodeRef,
    children,
    dimension = 'height',
    getDimensionValue = defaultGetDimensionValue,
}: HeadlessCollapseProps<T>): ReactNode {
    const handleEnter = () => {
        nodeRef.current?.style.setProperty(dimension, '0px');
    };
    const handelEntering = () => {
        const element = nodeRef.current;

        if (element) {
            const scrollProp = `scroll${capitalize(dimension)}` as 'scrollHeight' | 'scrollWidth';

            element.style.setProperty(dimension, `${element[scrollProp]}px`);
        }
    };

    const handleExit = () => {
        const element = nodeRef.current;

        if (element) {
            element.style.setProperty(dimension, `${getDimensionValue(element, dimension)}px`);
            triggerReflow(element);
        }
    };
    const resetDimension = () => {
        nodeRef.current?.style.setProperty(dimension, null);
    };

    const transitionEndListener = (done: VoidFunction) => {
        nodeRef.current?.addEventListener('transitionend', done, { once: true });
    };

    return (
        <Transition
            in={inProp}
            nodeRef={nodeRef}
            onEnter={handleEnter}
            onEntering={handelEntering}
            onEntered={resetDimension}
            onExit={handleExit}
            onExiting={resetDimension}
            addEndListener={transitionEndListener}
            appear={false}
            mountOnEnter={false}
            unmountOnExit={false}
        >
            {children}
        </Transition>
    );
}

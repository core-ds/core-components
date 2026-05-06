import React, { type FC } from 'react';
import cn from 'classnames';

import { PassThroughComponent } from '@alfalab/core-components-shared';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';
import { ArrowRightMIcon } from '@alfalab/icons-glyph/ArrowRightMIcon';

import { type NavigationProps as DefaultNavigationProps } from '../../types';
import { NavigationButton } from '../navigation-button';

import styles from './index.module.css';

export interface NavigationProps extends DefaultNavigationProps {
    position?: 'start' | 'center';
    colors?: 'default' | 'inverted';
}

export const Navigation: FC<NavigationProps> = ({
    onActiveElementChange,
    activeElement,
    elements,
    position,
    className,
    loop,
    colors,
}) => {
    const Wrapper = position === 'center' ? PassThroughComponent : 'div';

    return (
        <Wrapper className={cn(styles.component, className)}>
            <NavigationButton
                colors={colors}
                className={cn(className, position === 'center' && [styles.button, styles.prev])}
                icon={ArrowLeftMIcon}
                disabled={!loop && activeElement === 0}
                onClick={() => {
                    const nextActiveIndex =
                        (loop && activeElement === 0 ? elements : activeElement) - 1;

                    onActiveElementChange?.(nextActiveIndex);
                }}
            />
            <NavigationButton
                colors={colors}
                className={cn(className, position === 'center' && [styles.button, styles.next])}
                icon={ArrowRightMIcon}
                disabled={!loop && activeElement === elements - 1}
                onClick={() => {
                    const nextActiveIndex =
                        (loop && activeElement === elements - 1 ? 0 : activeElement) + 1;

                    onActiveElementChange?.(nextActiveIndex);
                }}
            />
        </Wrapper>
    );
};

import React, { type FC } from 'react';
import cn from 'classnames';

import { PassThroughComponent } from '@alfalab/core-components-shared';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';
import { ArrowRightMIcon } from '@alfalab/icons-glyph/ArrowRightMIcon';

import { useCarouselContext } from '../../context';
import { NavigationButton } from '../navigation-button';

import styles from './index.module.css';

export interface CarouselNavigationProps {
    className?: string;
    position: 'start' | 'center';
}

export const CarouselNavigation: FC<CarouselNavigationProps> = ({ className, position }) => {
    const { colors, loop, activeIndex, count, onActiveIndexChange } = useCarouselContext();
    const positionCenter = position === 'center';
    const Wrapper = positionCenter ? PassThroughComponent : 'div';
    const prevIsDisabled = !loop && activeIndex === 0;
    const nextIsDisabled = !loop && activeIndex === count - 1;

    return (
        <Wrapper className={cn(styles.component, className)}>
            <NavigationButton
                colors={colors}
                className={cn(className, positionCenter && [styles.button, styles.prev], {
                    [styles.hidden]: positionCenter && prevIsDisabled,
                })}
                icon={ArrowLeftMIcon}
                disabled={prevIsDisabled}
                onClick={() => {
                    const nextActiveIndex = (loop && activeIndex === 0 ? count : activeIndex) - 1;

                    onActiveIndexChange(nextActiveIndex);
                }}
            />
            <NavigationButton
                colors={colors}
                className={cn(className, positionCenter && [styles.button, styles.next], {
                    [styles.hidden]: positionCenter && nextIsDisabled,
                })}
                icon={ArrowRightMIcon}
                disabled={nextIsDisabled}
                onClick={() => {
                    const nextActiveIndex =
                        (loop && activeIndex === count - 1 ? 0 : activeIndex) + 1;

                    onActiveIndexChange(nextActiveIndex);
                }}
            />
        </Wrapper>
    );
};

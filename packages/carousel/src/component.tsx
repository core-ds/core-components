import React, { type ReactNode } from 'react';

import { NoopComponent } from '@alfalab/core-components-shared';

import { AnimatedWrapper } from './components/animated-wrapper';
import { CarouselLayout } from './components/layout';
import { CarouselNavigation } from './components/navigation';
import { HeadlessCarousel } from './headless-component';
import { type CarouselProps, type PaginationProps } from './types';

export function Carousel<T extends PaginationProps>({
    navigation = 'never',
    navigationPosition = 'center',
    Pagination = NoopComponent,
    paginationProps = {} as T,
    ...restProps
}: CarouselProps<T>): ReactNode {
    return (
        <HeadlessCarousel
            {...restProps}
            Wrapper={AnimatedWrapper}
            Layout={CarouselLayout}
            layoutProps={{ navigationDisplay: navigation }}
            Navigation={CarouselNavigation}
            navigationProps={{ position: navigationPosition }}
            Pagination={Pagination}
            paginationProps={paginationProps as T /* part of props comes from context */}
        />
    );
}

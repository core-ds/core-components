import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
    type GalleryImage,
    type GalleryPaginationConfig,
    type PaginationDirection,
} from '../types';

type PaginationState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'error'; direction: PaginationDirection };

const INITIAL_PAGINATION_STATE: PaginationState = { status: 'idle' };

type NavigationState = {
    currentSlideIndex: number;
    images: GalleryImage[];
};

type NavigationActions = {
    setCurrentSlideIndex?: (index: number) => void;
    slideTo: (index: number) => void;
};

type NavigationOptions = {
    loop: boolean;
    paginationConfig?: GalleryPaginationConfig;
};

type UseGalleryNavigationParams = {
    actions: NavigationActions;
    options: NavigationOptions;
    state: NavigationState;
};

const getTargetIndex = (
    direction: PaginationDirection,
    currentIndex: number,
    lastIndex: number,
    loop: boolean,
) => {
    if (direction === 'next') {
        if (currentIndex < lastIndex) {
            return currentIndex + 1;
        }

        return loop ? 0 : lastIndex;
    }

    if (currentIndex > 0) {
        return currentIndex - 1;
    }

    return loop ? lastIndex : 0;
};

export const useGalleryNavigation = ({
    actions: { setCurrentSlideIndex, slideTo },
    options: { loop, paginationConfig },
    state: { currentSlideIndex, images },
}: UseGalleryNavigationParams) => {
    const requestInProgress = useRef(false);

    const pendingDirection = useRef<PaginationDirection>();
    const previousImages = useRef(images);

    const [paginationState, setPaginationState] =
        useState<PaginationState>(INITIAL_PAGINATION_STATE);
    const { hasNextPage = true, hasPrevPage = true, onEdgeReached } = paginationConfig ?? {};

    const hasPagination = Boolean(paginationConfig);
    const lastIndex = images.length - 1;

    const resetPaginationState = useCallback(() => {
        setPaginationState(INITIAL_PAGINATION_STATE);
    }, []);

    const requestPage = useCallback(
        async (direction: PaginationDirection) => {
            if (!onEdgeReached || requestInProgress.current) {
                return;
            }

            requestInProgress.current = true;
            pendingDirection.current = direction;
            setPaginationState({ status: 'loading' });

            try {
                await onEdgeReached(direction);
                resetPaginationState();
            } catch {
                pendingDirection.current = undefined;
                setPaginationState({ status: 'error', direction });
            } finally {
                requestInProgress.current = false;
            }
        },
        [onEdgeReached, resetPaginationState],
    );

    const move = useCallback(
        (direction: PaginationDirection) => {
            const canNavigate = direction === 'next' ? hasNextPage : hasPrevPage;
            const reachedEdge =
                direction === 'next' ? currentSlideIndex >= lastIndex : currentSlideIndex <= 0;

            if (reachedEdge && hasPagination) {
                if (canNavigate) {
                    requestPage(direction);
                }

                return;
            }

            resetPaginationState();
            slideTo(getTargetIndex(direction, currentSlideIndex, lastIndex, loop));
        },
        [
            currentSlideIndex,
            hasNextPage,
            hasPagination,
            hasPrevPage,
            lastIndex,
            loop,
            requestPage,
            resetPaginationState,
            slideTo,
        ],
    );

    const slideNext = useCallback(() => move('next'), [move]);
    const slidePrev = useCallback(() => move('prev'), [move]);

    const retryPagination = useCallback(() => {
        if (paginationState.status === 'error') {
            requestPage(paginationState.direction);
        }
    }, [paginationState, requestPage]);

    useEffect(() => {
        if (previousImages.current === images) {
            return;
        }

        previousImages.current = images;
        const direction = pendingDirection.current;

        pendingDirection.current = undefined;
        resetPaginationState();

        if (images.length === 0) {
            return;
        }

        if (direction === 'next') {
            setCurrentSlideIndex?.(0);
        } else if (direction === 'prev') {
            setCurrentSlideIndex?.(images.length - 1);
        } else {
            setCurrentSlideIndex?.(Math.min(currentSlideIndex, images.length - 1));
        }
    }, [currentSlideIndex, images, resetPaginationState, setCurrentSlideIndex]);

    const navigation = useMemo(
        () => ({
            canSlideNext: currentSlideIndex < lastIndex || !hasPagination || hasNextPage,
            canSlidePrev: currentSlideIndex > 0 || !hasPagination || hasPrevPage,
            slideNext,
            slidePrev,
        }),
        [
            currentSlideIndex,
            hasNextPage,
            hasPagination,
            hasPrevPage,
            lastIndex,
            slideNext,
            slidePrev,
        ],
    );

    const pagination = useMemo(
        () => ({
            enabled: hasPagination,
            error: paginationState.status === 'error',
            loading: paginationState.status === 'loading',
            retry: retryPagination,
        }),
        [hasPagination, paginationState.status, retryPagination],
    );

    return {
        navigation,
        pagination,
    };
};

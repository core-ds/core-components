import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { Skeleton } from '../../Component';
import { type TextSkeletonProps } from '../../types/text-skeleton-props';
import {
    getFallbackSkeletonParams,
    measureSkeletonParams,
    type TextSkeletonParams,
} from '../../utils';

import styles from './use-skeleton.module.css';

type SkeletonProps = {
    wrapperClassName?: string;
    dataTestId?: string;
};

export function useSkeleton(showSkeleton?: boolean, skeletonProps?: TextSkeletonProps) {
    const [skeletonParams, setSkeletonParams] = useState<TextSkeletonParams | undefined>(() =>
        showSkeleton ? getFallbackSkeletonParams(skeletonProps) : undefined,
    );
    const textRef = useRef<HTMLElement>(null);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (!showSkeleton) {
            setSkeletonParams(undefined);

            return;
        }

        if (textRef.current) {
            setSkeletonParams(measureSkeletonParams(textRef.current, skeletonProps));

            return;
        }

        setSkeletonParams((prev) => prev ?? getFallbackSkeletonParams(skeletonProps));
    }, [showSkeleton, skeletonProps?.rows]);

    const renderSkeleton = (props: SkeletonProps) => {
        if (showSkeleton && skeletonParams) {
            return (
                <div
                    className={cn(
                        skeletonProps?.wrapperClassName,
                        props.wrapperClassName,
                        skeletonProps?.align && styles[skeletonProps.align],
                    )}
                    data-test-id={props.dataTestId}
                >
                    {[...Array(skeletonParams.rows)].map((_, idx) => {
                        const width = Array.isArray(skeletonProps?.width)
                            ? skeletonProps?.width[idx]
                            : skeletonProps?.width;

                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={idx} style={{ width, padding: skeletonParams.padding }}>
                                <Skeleton visible={true} className={styles.skeletonText}>
                                    <div style={{ height: skeletonParams.height }} />
                                </Skeleton>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    return { renderSkeleton, textRef };
}

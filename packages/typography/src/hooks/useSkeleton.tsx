import React, { useRef, useState } from 'react';

import { Skeleton } from '@alfalab/core-components-skeleton';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { TextSkeletonProps } from '../types';

import styles from './use-skeleton.module.css';

type TextSkeletonParams = {
    height: number;
    padding: string;
    rows: number;
};

type SkeletonProps = {
    wrapperClassName?: string;
    dataTestId?: string;
};

export function useSkeleton(showSkeleton?: boolean, skeletonProps?: TextSkeletonProps) {
    const [skeletonParams, setSkeletonParams] = useState<TextSkeletonParams>();
    const textRef = useRef<HTMLElement>(null);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (showSkeleton && textRef.current) {
            const style = getComputedStyle(textRef.current);

            const textHeight = textRef.current.offsetHeight;
            const fontSize = parseInt(style.fontSize, 10);
            const lineHeight = parseInt(style.lineHeight, 10);

            const padding =
                (lineHeight - fontSize) % 2 === 0
                    ? (lineHeight - fontSize) / 2
                    : (lineHeight - fontSize - 1) / 2;

            const rows = skeletonProps?.rows
                ? skeletonProps?.rows
                : Math.ceil(textHeight / lineHeight);

            setSkeletonParams({
                height: lineHeight - padding * 2,
                padding: `${padding}px 0`,
                rows,
            });
        } else {
            setSkeletonParams(undefined);
        }
    }, [showSkeleton, skeletonProps?.rows]);

    const renderSkeleton = (props: SkeletonProps) => {
        if (showSkeleton && skeletonParams) {
            return (
                <div className={props.wrapperClassName} data-test-id={props.dataTestId}>
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

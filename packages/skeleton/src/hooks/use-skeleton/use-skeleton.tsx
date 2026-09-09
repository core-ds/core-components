import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { getElementWindow, noop } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { Skeleton } from '../../Component';
import { type TextSkeletonProps } from '../../types/text-skeleton-props';

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

/** Fallback для SSR. */
const getFallbackSkeletonParams = (skeletonProps?: TextSkeletonProps): TextSkeletonParams => ({
    height: 16,
    padding: '4px 0',
    rows: skeletonProps?.rows || 1,
});

export function useSkeleton(showSkeleton?: boolean, skeletonProps?: TextSkeletonProps) {
    const [skeletonParams, setSkeletonParams] = useState<TextSkeletonParams>();
    const textRef = useRef<HTMLElement>(null);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (showSkeleton) {
            const timer = requestAnimationFrame(() => {
                const node = textRef.current;

                if (node) {
                    const style = getElementWindow(node).getComputedStyle(node);
                    const document = node.ownerDocument;
                    const textHeight = node.offsetHeight;
                    const fontSize = parseInt(style.fontSize, 10);
                    const lineHeight = parseInt(style.lineHeight, 10);
                    let padding =
                        (lineHeight - fontSize) % 2 === 0
                            ? (lineHeight - fontSize) / 2
                            : (lineHeight - fontSize - 1) / 2;
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    /**
                     * Расчет отступов с учётом размера глифа от базовой линии до верхней границы
                     * Это позволяет отображать более приближённый размер скелетона к начертанию текста
                     * @see DS-12535
                     */
                    if (context && node.textContent) {
                        context.font = style.font;
                        const metrics = context.measureText(node.textContent);

                        padding = (lineHeight - metrics.actualBoundingBoxAscent) / 2;
                    }

                    const rows = skeletonProps?.rows ?? Math.ceil(textHeight / lineHeight);

                    setSkeletonParams({
                        height: lineHeight - padding * 2,
                        padding: `${padding}px 0`,
                        rows,
                    });
                } else {
                    setSkeletonParams(undefined);
                }
            });

            return () => {
                cancelAnimationFrame?.(timer);
            };
        }

        return noop;
    }, [showSkeleton, skeletonProps?.rows]);

    const renderSkeleton = (props: SkeletonProps) => {
        const params = skeletonParams ?? getFallbackSkeletonParams(skeletonProps);

        if (showSkeleton && params) {
            return (
                <div
                    className={cn(
                        skeletonProps?.wrapperClassName,
                        props.wrapperClassName,
                        skeletonProps?.align && styles[skeletonProps.align],
                    )}
                    data-test-id={props.dataTestId}
                >
                    {[...Array(params.rows)].map((_, idx) => {
                        const width = Array.isArray(skeletonProps?.width)
                            ? skeletonProps?.width[idx]
                            : skeletonProps?.width;

                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={idx} style={{ width, padding: params.padding }}>
                                <Skeleton visible={true} className={styles.skeletonText}>
                                    <div style={{ height: params.height }} />
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

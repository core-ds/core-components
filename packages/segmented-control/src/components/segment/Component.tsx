import React, { forwardRef, ReactNode, useContext, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import { SegmentedControlContext } from '../../context';
import { IDType } from '../../typing';

import styles from './index.module.css';

export type SegmentProps = {
    /**
     * Дополнительный className
     */
    className?: string;

    /**
     * Дополнительный className для контента сегмента
     */
    contentClassName?: string;

    /**
     * ID сегмента
     */
    id: IDType;

    /**
     * Заголовок сегмента
     */
    title: string;

    /**
     * Контент выбранного сегмента
     */
    children?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
    ({ id, className, title, dataTestId }, ref) => {
        const { onChange } = useContext(SegmentedControlContext);

        const segmentRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(segmentRef, 'keyboard');

        const handleClick = () => {
            onChange(id);
        };

        return (
            <button
                type='button'
                onClick={handleClick}
                ref={mergeRefs([segmentRef, ref])}
                className={cn(styles.segment, className, styles.focused && focused)}
                data-test-id={dataTestId}
            >
                {title}
            </button>
        );
    },
);

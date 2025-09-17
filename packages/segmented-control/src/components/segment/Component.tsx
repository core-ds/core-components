import React, { forwardRef, type ReactNode, useContext, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import { SegmentedControlContext } from '../../context';
import { type IDType } from '../../typing';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

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
    title: ReactNode;

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
        const { onChange, colors = 'default' } = useContext(SegmentedControlContext);

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
                className={cn(
                    styles.segment,
                    colorStyles[colors].segment,
                    className,
                    styles.focused && focused,
                )}
                data-test-id={dataTestId}
            >
                {title}
            </button>
        );
    },
);

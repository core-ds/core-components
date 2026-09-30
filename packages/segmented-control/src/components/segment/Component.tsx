import React, { forwardRef, type ReactElement, type ReactNode, useContext, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
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

type SegmentAddon = {
    /**
     * Контент аддона
     */
    content: ReactElement;
};

type SegmentAddons = {
    left?: SegmentAddon;
    right?: SegmentAddon;
};

export interface SegmentProps {
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

    /**
     * Аддоны сегмента
     */
    addons?: SegmentAddons;
}

export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
    ({ id, className, title, dataTestId, addons }, ref) => {
        const { onChange, colors = 'default', size } = useContext(SegmentedControlContext);

        const segmentRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(segmentRef, 'keyboard');

        const hasTitle = title !== undefined && title !== null;
        const addonClassName = cn(styles.addon, styles[`addonSize${size}`]);
        const hasLeftAddon = Boolean(addons?.left);
        const hasRightAddon = Boolean(addons?.right);
        const titleClassName = cn(styles.title, {
            [styles[`titleIndentRight${size}`]]: hasLeftAddon && !hasRightAddon,
            [styles[`titleIndentLeft${size}`]]: hasRightAddon && !hasLeftAddon,
        });

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
                {addons?.left && (
                    <span
                        className={addonClassName}
                        aria-hidden={true}
                        data-test-id={getDataTestId(dataTestId, 'left-addon')}
                    >
                        {addons.left.content}
                    </span>
                )}
                {hasTitle && <span className={titleClassName}>{title}</span>}
                {addons?.right && (
                    <span
                        className={addonClassName}
                        aria-hidden={true}
                        data-test-id={getDataTestId(dataTestId, 'right-addon')}
                    >
                        {addons.right.content}
                    </span>
                )}
            </button>
        );
    },
);

import React, { forwardRef, useContext, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';

import { SegmentedControlContext } from '../../context';

import { type SegmentProps } from './types';
import { isAddonOnly } from './utils';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
    ({ id, className, title, dataTestId, leftAddons, rightAddons }, ref) => {
        const {
            onChange,
            colors = 'default',
            size,
            selectedId,
            segmentWidth,
        } = useContext(SegmentedControlContext);

        const segmentRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(segmentRef, 'keyboard');

        const addonOnly = isAddonOnly({ title, leftAddons, rightAddons });

        const addonClassName = cn(styles.addon, styles[`addonSize${size}`], {
            [styles.addonOnly]: addonOnly,
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
                    size && styles[`size${size}`],
                    {
                        [styles.selected]: id === selectedId,
                        [styles.addonOnly]: addonOnly,
                        [styles.contentWidth]: segmentWidth === 'content',
                    },
                    className,
                    styles.focused && focused,
                )}
                data-test-id={dataTestId}
            >
                {Boolean(leftAddons) && (
                    <span
                        className={addonClassName}
                        data-test-id={getDataTestId(dataTestId, 'left-addon')}
                    >
                        {leftAddons}
                    </span>
                )}
                {Boolean(title) && <span className={styles.title}>{title}</span>}
                {Boolean(rightAddons) && (
                    <span
                        className={addonClassName}
                        data-test-id={getDataTestId(dataTestId, 'right-addon')}
                    >
                        {rightAddons}
                    </span>
                )}
            </button>
        );
    },
);

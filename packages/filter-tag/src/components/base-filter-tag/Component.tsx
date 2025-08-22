import React, { forwardRef, KeyboardEvent, MouseEvent, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import { isKeyBoardEvent } from '../../helpers/is-keyboard-event';
import { PrivateProps } from '../../types/base-filter-tag-private-props';
import { BaseFilterTagProps } from '../../types/base-filter-tag-props';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-32',
    xs: 'size-40',
    s: 'size-48',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
};

export const BaseFilterTag = forwardRef<HTMLDivElement, BaseFilterTagProps & PrivateProps>(
    (
        {
            children,
            checked,
            disabled,
            open,
            onClick,
            size = 48,
            variant = 'default',
            shape,
            view = 'outlined',
            onClear = () => null,
            showClear = true,
            block = false,
            className,
            dataTestId,
            styles = {},
            colors = 'default',
            colorStylesMap = { default: {}, inverted: {} },
            leftAddons,
        },
        ref,
    ) => {
        const valueRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(valueRef, 'keyboard');

        const handleClear = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
            event.stopPropagation();

            if (isKeyBoardEvent(event)) {
                const clickSimilarKeys = ['Enter'].includes(event.key);

                if (clickSimilarKeys) onClear();

                return;
            }

            onClear();
        };

        const variantClassName = variant === 'default' ? 'rounded' : 'rectangular';

        const shapeClassName = shape || variantClassName;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                className={cn(
                    className,
                    commonStyles.component,
                    colorStyles[colors].component,
                    commonStyles[shapeClassName],
                    commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                    styles.component,
                    styles[shapeClassName],
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    {
                        [commonStyles.checked]: checked,
                        [colorStyles[colors].checked]: checked,
                        [styles.checked]: checked,
                        [commonStyles.disabled]: disabled,
                        [colorStyles[colors].disabled]: disabled,
                        [commonStyles.focused]: focused,
                        [commonStyles.open]: open,
                        [commonStyles.block]: block,
                    },
                )}
                ref={ref}
                data-test-id={dataTestId}
                onClick={disabled ? undefined : onClick}
            >
                <button
                    type='button'
                    ref={valueRef}
                    disabled={disabled}
                    className={cn(
                        commonStyles.valueButton,
                        colorStyles[colors].valueButton,
                        styles.valueButton,
                        colorStylesMap[colors].valueButton,
                        commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                        styles[SIZE_TO_CLASSNAME_MAP[size]],
                        commonStyles[shapeClassName],
                        styles[shapeClassName],
                        commonStyles[view],
                        colorStyles[colors][view],
                        {
                            [styles[view]]: Boolean(styles[view]),
                            [colorStylesMap[colors][view]]: Boolean(colorStylesMap[colors][view]),
                            [commonStyles.checked]: checked,
                            [colorStyles[colors].checked]: checked,
                            [styles.checked]: checked,
                            [commonStyles.open]: open,
                            [commonStyles.close]: !showClear,
                            [styles.close]: !showClear,
                            [commonStyles.block]: block,
                            [commonStyles.withClear]: showClear,
                        },
                    )}
                >
                    {leftAddons && <div className={commonStyles.addons}>{leftAddons}</div>}
                    <span className={commonStyles.content}>{children}</span>
                    <span className={cn(commonStyles.chevron, colorStyles[colors].chevron)}>
                        {['size-40', 'size-32'].includes(SIZE_TO_CLASSNAME_MAP[size]) ? (
                            <ChevronDownCompactSIcon />
                        ) : (
                            <ChevronDownMIcon />
                        )}
                    </span>
                </button>

                {checked && !disabled && showClear && (
                    <div
                        role='button'
                        className={cn(
                            commonStyles.clear,
                            [colorStyles[colors].clear],
                            styles.clear,
                            commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                            styles[SIZE_TO_CLASSNAME_MAP[size]],
                            styles[shapeClassName],
                            commonStyles[shapeClassName],
                        )}
                        onClick={handleClear}
                        onKeyDown={handleClear}
                        tabIndex={0}
                    >
                        {['size-40', 'size-32'].includes(SIZE_TO_CLASSNAME_MAP[size]) ? (
                            <CrossCircleSIcon />
                        ) : (
                            <CrossCircleMIcon />
                        )}
                    </div>
                )}
            </div>
        );
    },
);

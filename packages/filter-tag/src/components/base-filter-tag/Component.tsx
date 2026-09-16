import React, { forwardRef, type KeyboardEvent, type MouseEvent, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronDownSIcon } from '@alfalab/icons-glyph/ChevronDownSIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import { getSizeClassName } from '../../helpers/get-size-class-name';
import { type PrivateProps } from '../../types/base-filter-tag-private-props';
import { type BaseFilterTagProps } from '../../types/base-filter-tag-props';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
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
            shape = 'rounded',
            view = 'outlined',
            onClear = () => null,
            showClear = true,
            showArrow = true,
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

        const shouldShowChevron = !checked || showArrow;
        const shouldShowClear = Boolean(checked && !disabled && showClear);

        const withClearOnly = shouldShowClear && !shouldShowChevron;
        const withChevronAndClear = shouldShowChevron && shouldShowClear;

        const handleClear = (event: MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            onClear();
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            event.stopPropagation();

            if (event.key === 'Enter') onClear();
        };

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                className={cn(
                    className,
                    commonStyles.component,
                    colorStyles[colors].component,
                    commonStyles[shape],
                    commonStyles[getSizeClassName(size)],
                    styles.component,
                    styles[shape],
                    styles[getSizeClassName(size)],
                    colorStyles[colors][view],
                    {
                        [colorStylesMap[colors][view]]: Boolean(colorStylesMap[colors][view]),
                        [commonStyles.checked]: checked,
                        [colorStyles[colors].checked]: checked,
                        [styles.checked]: checked,
                        [commonStyles.disabled]: disabled,
                        [colorStyles[colors].disabled]: disabled,
                        [commonStyles.focused]: focused,
                        [commonStyles.open]: open,
                        [commonStyles.block]: block,
                        [commonStyles.withClearOnly]: withClearOnly,
                        [colorStyles[colors].withClearOnly]: withClearOnly,
                        [commonStyles.withSplitControls]: withChevronAndClear,
                        [colorStyles[colors].withSplitControls]: withChevronAndClear,
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
                        commonStyles[getSizeClassName(size)],
                        styles[getSizeClassName(size)],
                        commonStyles[shape],
                        styles[shape],
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
                            [commonStyles.withChevronAndClear]: withChevronAndClear,
                        },
                    )}
                >
                    {leftAddons && <div className={commonStyles.addons}>{leftAddons}</div>}
                    <span className={commonStyles.content}>{children}</span>
                    {shouldShowChevron && (
                        <span className={cn(commonStyles.chevron, colorStyles[colors].chevron)}>
                            {[40, 32].includes(size) ? <ChevronDownSIcon /> : <ChevronDownMIcon />}
                        </span>
                    )}
                </button>

                {shouldShowClear && (
                    <div
                        role='button'
                        className={cn(
                            commonStyles.clear,
                            [colorStyles[colors].clear],
                            styles.clear,
                            commonStyles[getSizeClassName(size)],
                            styles[getSizeClassName(size)],
                            styles[shape],
                            commonStyles[shape],
                        )}
                        onClick={handleClear}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {[40, 32].includes(size) ? <CrossCircleSIcon /> : <CrossCircleMIcon />}
                    </div>
                )}
            </div>
        );
    },
);

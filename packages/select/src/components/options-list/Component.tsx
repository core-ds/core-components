import React, { forwardRef, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { DEFAULT_VISIBLE_OPTIONS } from '../../consts';
import { GroupShape, OptionShape, OptionsListProps } from '../../typings';
import { getScrollbarSize, isGroup, useVisibleOptions } from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import styles from './index.module.css';

const createCounter = () => {
    let count = 0;

    // eslint-disable-next-line no-plusplus
    return () => count++;
};

export const OptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    (
        {
            size = 's',
            className,
            optionGroupClassName,
            Option,
            getOptionProps,
            options = [],
            Optgroup = DefaultOptgroup,
            dataTestId,
            emptyPlaceholder,
            visibleOptions = DEFAULT_VISIBLE_OPTIONS,
            onScroll,
            open,
            header,
            footer,
            showFooter = true,
            nativeScrollbar: nativeScrollbarProp,
            flatOptions = [],
        },
        ref,
    ) => {
        const [scrollbarSize, setScrollbarSize] = useState<number>(0);
        const nativeScrollbar = Boolean(nativeScrollbarProp ?? !scrollbarSize);

        const renderOption = (option: OptionShape, index: number) => (
            <Option key={option.key} {...getOptionProps(option, index)} />
        );

        const listRef = useRef<HTMLDivElement>(null);
        const counter = createCounter();
        const renderGroup = (group: GroupShape) => (
            <Optgroup
                className={optionGroupClassName}
                label={group.label}
                key={group.label}
                size={size}
            >
                {group.options.map((option) => renderOption(option, counter()))}
            </Optgroup>
        );

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (nativeScrollbarProp === undefined) {
                setScrollbarSize(getScrollbarSize());
            }
        }, [nativeScrollbarProp]);

        useVisibleOptions({
            visibleOptions,
            listRef,
            open,
            invalidate: options,
        });

        if (options.length === 0 && !emptyPlaceholder) {
            return null;
        }

        const renderListItems = () => (
            <React.Fragment>
                {options.map((option) =>
                    isGroup(option) ? renderGroup(option) : renderOption(option, counter()),
                )}

                {emptyPlaceholder && options.length === 0 && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}
            </React.Fragment>
        );

        return (
            <div
                data-test-id={dataTestId}
                className={cn(styles.optionsList, styles[size], className)}
            >
                {header && <div className={styles.optionsListHeader}>{header}</div>}

                <div
                    className={cn(styles.scrollable, {
                        [styles.customScrollbar]:
                            !nativeScrollbar && flatOptions.length > visibleOptions + 1,
                    })}
                    ref={mergeRefs([listRef, ref])}
                    onScroll={onScroll}
                >
                    {renderListItems()}
                </div>

                {showFooter && footer && (
                    <div
                        className={cn(styles.optionsListFooter, {
                            [styles.withBorder]: flatOptions.length > visibleOptions,
                        })}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);

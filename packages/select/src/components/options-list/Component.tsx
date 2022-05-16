import React, { forwardRef, useCallback, useRef } from 'react';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';
import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { OptionsListProps, GroupShape, OptionShape } from '../../typings';
import { Optgroup as DefaultOptgroup } from '../optgroup';
import { isGroup, useVisibleOptions } from '../../utils';

import styles from './index.module.css';

const createCounter = () => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++;
};

export const OptionsList = forwardRef(
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
            visibleOptions = 5,
            onScroll,
            open,
            header,
            footer,
        }: OptionsListProps,
        ref,
    ) => {
        const renderOption = useCallback(
            (option: OptionShape, index: number) => (
                <Option key={option.key} {...getOptionProps(option, index)} />
            ),
            [getOptionProps],
        );

        const listRef = useRef<HTMLDivElement>(null);
        const scrollbarRef = useRef<HTMLDivElement>(null);
        const counter = createCounter();
        const renderGroup = useCallback(
            (group: GroupShape) => (
                <Optgroup
                    className={optionGroupClassName}
                    label={group.label}
                    key={group.label}
                    size={size}
                >
                    {group.options.map(option => renderOption(option, counter()))}
                </Optgroup>
            ),
            [optionGroupClassName, counter, renderOption, size],
        );

        useVisibleOptions({
            visibleOptions,
            listRef,
            open,
            invalidate: options,
            styleTargetRef: scrollbarRef,
        });

        if (options.length === 0 && !emptyPlaceholder) {
            return null;
        }

        return (
            <div className={cn(styles.optionsList, styles[size], className)}>
                {header}

                <Scrollbar className={styles.scrollable} ref={scrollbarRef}>
                    {({
                        scrollableNodeClassName,
                        scrollableNodeRef,
                        contentNodeClassName,
                        contentNodeRef,
                    }) => (
                        <div
                            ref={scrollableNodeRef}
                            onScroll={onScroll}
                            className={scrollableNodeClassName}
                            data-test-id={dataTestId}
                        >
                            <div
                                ref={mergeRefs([listRef, ref, contentNodeRef])}
                                className={contentNodeClassName}
                            >
                                {options.map(option =>
                                    isGroup(option)
                                        ? renderGroup(option)
                                        : renderOption(option, counter()),
                                )}

                                {emptyPlaceholder && options.length === 0 && (
                                    <div className={styles.emptyPlaceholder}>
                                        {emptyPlaceholder}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Scrollbar>

                {footer}
            </div>
        );
    },
);

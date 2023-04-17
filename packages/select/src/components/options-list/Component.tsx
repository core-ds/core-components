import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { useMedia } from '@alfalab/hooks';

import { GroupShape, OptionShape, OptionsListProps } from '../../typings';
import { isGroup, useVisibleOptions } from '../../utils';
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
            visibleOptions = 5,
            onScroll,
            open,
            header,
            footer,
            optionsListWidth,
            nativeScrollbar: nativeScrollbarProp,
            flatOptions = [],
        },
        ref,
    ) => {
        let [nativeScrollbar] = useMedia<boolean>([[true, '(max-width: 1023px)']], false);

        nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);

        const renderOption = (option: OptionShape, index: number) => (
            <Option key={option.key} {...getOptionProps(option, index)} />
        );

        const listRef = useRef<HTMLDivElement>(null);
        const scrollbarRef = useRef<HTMLDivElement>(null);
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

        useVisibleOptions({
            ...(!nativeScrollbar && { styleTargetRef: scrollbarRef }),
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

        const renderWithCustomScrollbar = () => {
            const scrollableNodeProps = {
                onScroll,
                'data-test-id': dataTestId,
                ref: ref as React.RefObject<HTMLDivElement>,
            };

            return (
                <Scrollbar
                    className={styles.scrollable}
                    ref={scrollbarRef}
                    horizontalAutoStretch={optionsListWidth === 'content'}
                    scrollableNodeProps={scrollableNodeProps}
                    contentNodeProps={{ ref: listRef }}
                >
                    {renderListItems()}
                </Scrollbar>
            );
        };

        const renderWithNativeScrollbar = () => (
            <div className={styles.scrollable} ref={mergeRefs([listRef, ref])} onScroll={onScroll}>
                {renderListItems()}
            </div>
        );

        return (
            <div
                {...(nativeScrollbar && { 'data-test-id': dataTestId })}
                className={cn(styles.optionsList, styles[size], className)}
            >
                {header && <div className={styles.optionsListHeader}>{header}</div>}

                {nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar()}

                {footer && (
                    <div
                        className={cn(styles.optionsListFooter, {
                            [styles.withBorder]:
                                visibleOptions && flatOptions.length > visibleOptions,
                        })}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);

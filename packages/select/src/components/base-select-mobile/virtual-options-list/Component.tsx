import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import { Button } from '@alfalab/core-components-button';
import { usePrevious } from '@alfalab/hooks';

import { GroupShape, OptionShape, OptionsListProps } from '../../../typings';
import { isGroup, lastIndexOf } from '../../../utils';
import { Optgroup as DefaultOptgroup } from '../../optgroup';

import styles from './index.module.css';

export const VirtualOptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    (
        {
            flatOptions = [],
            highlightedIndex = -1,
            size = 's',
            className,
            Option,
            getOptionProps,
            options = [],
            Optgroup = DefaultOptgroup,
            dataTestId,
            emptyPlaceholder,
            showFooter,
            open,
            onApply = () => null,
            onClear = () => null,
        },
        ref,
    ) => {
        const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);

        useEffect(() => {
            setHasFooter(true);
        }, [setHasFooter]);

        const listRef = useRef<HTMLDivElement>(null);
        const prevHighlightedIndex = usePrevious(highlightedIndex) || -1;

        const parentRef = ref && typeof ref === 'object' ? ref : listRef;

        const rowVirtualizer = useVirtual({
            size: flatOptions.length,
            parentRef,
            overscan: 15,
        });

        // Сколл к выбранному пункту при открытии меню
        useEffect(() => {
            if (open) {
                rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open]);

        // Скролл к пункту, которого нет на экране
        useEffect(() => {
            if (highlightedIndex === -1) return;

            if (!rowVirtualizer.virtualItems.some((option) => option.index === highlightedIndex)) {
                rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [highlightedIndex]);

        // Циклическая навигация
        useEffect(() => {
            const notDisabled = (option: OptionShape) => !option.disabled;
            const firstNonDisabled = flatOptions.findIndex(notDisabled);
            const lastNonDisabled = lastIndexOf(flatOptions, notDisabled);

            if (
                prevHighlightedIndex <= firstNonDisabled &&
                highlightedIndex === flatOptions.length - 1
            ) {
                rowVirtualizer.scrollToIndex(lastNonDisabled);
            }

            if (prevHighlightedIndex >= lastNonDisabled && highlightedIndex === 0) {
                rowVirtualizer.scrollToIndex(0);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [prevHighlightedIndex, highlightedIndex]);

        // Т.к. рендерится плоский список, необходимо знать индекс, когда начинается новая группа
        const groupStartIndexes = useMemo(() => {
            let currentIndex = 0;

            return options.reduce((acc: { [key: number]: number }, option, index) => {
                if (isGroup(option)) {
                    acc[currentIndex] = index;
                    currentIndex += option.options.length;
                } else {
                    currentIndex += 1;
                }

                return acc;
            }, {});
        }, [options]);

        const contentNodeProps = {
            className: styles.inner,
            style: { height: `${rowVirtualizer.totalSize}px` },
            ref: listRef,
        };

        const renderList = () =>
            rowVirtualizer.virtualItems.map((virtualRow) => {
                const option = flatOptions[virtualRow.index];
                const group = options[groupStartIndexes[virtualRow.index]] as GroupShape;

                return (
                    <div
                        key={virtualRow.index}
                        ref={virtualRow.measureRef}
                        className={cn(styles.virtualRow, {
                            [styles.highlighted]: highlightedIndex === virtualRow.index,
                        })}
                        style={{
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                    >
                        {group && <Optgroup label={group.label} />}
                        {!isGroup(option) && (
                            <Option {...getOptionProps(option, virtualRow.index)} />
                        )}
                    </div>
                );
            });

        if (options.length === 0 && !emptyPlaceholder) {
            return null;
        }

        return (
            <div
                className={cn(styles.virtualOptionsList, styles[size], className)}
                data-test-id={dataTestId}
            >
                <div {...contentNodeProps}>{renderList()}</div>

                {emptyPlaceholder && options.length === 0 && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}

                {showFooter && (
                    <div
                        className={cn(styles.footer, className, {
                            [styles.footerHighlighted]: footerHighlighted,
                        })}
                    >
                        <Button
                            size='s'
                            view='primary'
                            onClick={onApply}
                            className={styles.footerButton}
                        >
                            Применить
                        </Button>

                        <Button
                            size='s'
                            view='secondary'
                            onClick={onClear}
                            className={styles.footerButton}
                        >
                            Сбросить
                        </Button>
                    </div>
                )}
            </div>
        );
    },
);

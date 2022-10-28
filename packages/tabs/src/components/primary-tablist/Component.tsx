import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components-badge';
import { KeyboardFocusable } from '@alfalab/core-components-keyboard-focusable';
import { PickerButton, PickerButtonProps } from '@alfalab/core-components-picker-button';

import { useTablistTitles } from '../../hooks/use-tablist-titles';
import { createSyntheticMouseEvent } from '../../synthetic-events';
import { Styles, TabListProps } from '../../typings';
import { ScrollableContainer } from '../scrollable-container';
import { Title } from '../title';

export const PrimaryTabList = ({
    size,
    styles = {},
    className,
    containerClassName,
    titles = [],
    selectedId = titles.length ? titles[0].id : undefined,
    scrollable = true,
    collapsible,
    fullWidthScroll,
    onChange,
    dataTestId,
}: TabListProps & Styles) => {
    const lineRef = useRef<HTMLDivElement>(null);

    const { containerRef, addonRef, tablistTitles, selectedTab, focusedTab, getTabListItemProps } =
        useTablistTitles({
            titles,
            selectedId,
            collapsible,
            onChange,
        });

    useEffect(() => {
        if (selectedTab && lineRef.current) {
            lineRef.current.style.width = `${selectedTab.offsetWidth}px`;
            lineRef.current.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
        }
    }, [selectedTab, tablistTitles]);

    const collapsedOptions = tablistTitles.reduce<PickerButtonProps['options']>(
        (options, title) =>
            title.collapsed
                ? [
                      ...options,
                      {
                          key: title.title,
                          value: title.id,
                          content: <Title {...title} styles={styles} isOption={true} />,
                      },
                  ]
                : options,
        [],
    );

    const collapsedAddonsLength = tablistTitles.filter(
        (title) => title.collapsed && title.rightAddons,
    ).length;

    const handleOptionsChange = (
        payload: Parameters<Required<PickerButtonProps>['onChange']>[0],
    ) => {
        if (payload.selected?.value && onChange) {
            const nativeMouseEvent = new MouseEvent('change');
            const syntheticMouseEvent = createSyntheticMouseEvent(nativeMouseEvent);

            onChange(syntheticMouseEvent, { selectedId: payload.selected.value });
        }
    };

    const renderContent = () => (
        <div
            role='tablist'
            data-test-id={dataTestId}
            className={cn(styles.component, className, size && styles[size], {
                [styles.fullWidthScroll]: fullWidthScroll,
            })}
        >
            {tablistTitles.map((title, index) => (
                <KeyboardFocusable key={title.id}>
                    {(ref, focused) => (
                        <Title
                            {...getTabListItemProps(index, ref)}
                            {...title}
                            focused={focused}
                            styles={styles}
                        />
                    )}
                </KeyboardFocusable>
            ))}

            {collapsedOptions.length ? (
                <span ref={addonRef} className={cn(styles.pickerWrapper)}>
                    <PickerButton
                        fieldClassName={cn(styles.title)}
                        optionClassName={cn(styles.pickerOption, size && styles[size])}
                        options={collapsedOptions}
                        onChange={handleOptionsChange}
                        rightAddons={
                            collapsedAddonsLength ? (
                                <Badge view='count' content={collapsedAddonsLength} />
                            ) : null
                        }
                        size='l'
                        view='ghost'
                        label='Ещё'
                    />
                </span>
            ) : null}

            <div className={styles.line} ref={lineRef} />
        </div>
    );

    return scrollable && !collapsible ? (
        <ScrollableContainer
            activeChild={focusedTab || selectedTab}
            containerClassName={containerClassName}
            fullWidthScroll={fullWidthScroll}
        >
            {renderContent()}
        </ScrollableContainer>
    ) : (
        <div ref={containerRef} className={cn(styles.container, containerClassName)}>
            {renderContent()}
        </div>
    );
};

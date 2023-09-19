import React, { useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components-badge';
import { KeyboardFocusable } from '@alfalab/core-components-keyboard-focusable';
import {
    PickerButtonDesktop,
    PickerButtonDesktopProps,
} from '@alfalab/core-components-picker-button/desktop';

import { useTablistTitles } from '../../hooks/use-tablist-titles';
import { createSyntheticMouseEvent } from '../../synthetic-events';
import { TabListProps } from '../../typings';
import { Title } from '../title';

import styles from './index.module.css';

export const CollapsiblePrimaryTabList = ({
    size = 'm',
    className,
    containerClassName,
    titles = [],
    selectedId = titles.length ? titles[0].id : undefined,
    collapsedTabsIds,
    fullWidthScroll,
    onChange,
    dataTestId,
    breakpoint = 1024,
    defaultMatchMediaValue,
}: TabListProps) => {
    const lineRef = useRef<HTMLDivElement>(null);

    const { containerRef, addonRef, tablistTitles, selectedTab, getTabListItemProps } =
        useTablistTitles({
            titles,
            selectedId,
            collapsedTabsIds,
            breakpoint,
            onChange,
            defaultMatchMediaValue,
        });

    useEffect(() => {
        if (selectedTab && lineRef.current) {
            lineRef.current.style.width = `${selectedTab.offsetWidth}px`;
            lineRef.current.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
        }
    }, [selectedTab, tablistTitles]);

    const collapsedOptions = useMemo(
        () =>
            tablistTitles.reduce<PickerButtonDesktopProps['options']>((options, title) => {
                if (title.collapsed) {
                    options.push({
                        key: title.title,
                        value: title.id,
                        content: <Title {...title} styles={styles} isOption={true} />,
                    });
                }

                return options;
            }, []),
        [tablistTitles],
    );

    const collapsedAddonsLength = tablistTitles.filter(
        (title) => title.collapsed && title.rightAddons,
    ).length;

    const handleOptionsChange = (
        payload: Parameters<Required<PickerButtonDesktopProps>['onChange']>[0],
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
            {tablistTitles.map(({ dataTestId: _, ...restTitleProps }, index) => (
                <KeyboardFocusable key={restTitleProps.id}>
                    {(ref, focused) => (
                        <Title
                            {...getTabListItemProps(index, ref)}
                            {...restTitleProps}
                            focused={focused}
                            styles={styles}
                        />
                    )}
                </KeyboardFocusable>
            ))}

            {collapsedOptions.length ? (
                <span ref={addonRef} role='menu' className={styles.pickerWrapper}>
                    <PickerButtonDesktop
                        fieldClassName={styles.title}
                        optionClassName={cn(styles.pickerOption, size && styles[size])}
                        options={collapsedOptions}
                        onChange={handleOptionsChange}
                        rightAddons={
                            collapsedAddonsLength ? (
                                <Badge view='count' content={collapsedAddonsLength} />
                            ) : null
                        }
                        size='m'
                        view='ghost'
                        label='Ещё'
                        popoverPosition='bottom-end'
                    />
                </span>
            ) : null}

            <div className={styles.line} ref={lineRef} />
        </div>
    );

    return (
        <div ref={containerRef} className={cn(styles.container, containerClassName)}>
            {renderContent()}
        </div>
    );
};

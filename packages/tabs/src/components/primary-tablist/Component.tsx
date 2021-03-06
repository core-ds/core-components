import React, { useEffect, useRef } from 'react';
import { KeyboardFocusable } from '@alfalab/core-components-keyboard-focusable';
import cn from 'classnames';
import { Styles, TabListProps } from '../../typings';

import { ScrollableContainer } from '../scrollable-container';
import { useTabs } from '../../useTabs';

export const PrimaryTabList = ({
    size,
    styles = {},
    className,
    containerClassName,
    titles = [],
    selectedId = titles.length ? titles[0].id : undefined,
    scrollable = true,
    fullWidthScroll,
    onChange,
    dataTestId,
}: TabListProps & Styles) => {
    const lineRef = useRef<HTMLDivElement>(null);

    const { selectedTab, focusedTab, getTabListItemProps } = useTabs({
        titles,
        selectedId,
        onChange,
    });

    useEffect(() => {
        if (selectedTab && lineRef.current) {
            lineRef.current.style.width = `${selectedTab.offsetWidth}px`;
            lineRef.current.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
        }
    }, [selectedTab]);

    const renderContent = () => (
        <div
            role='tablist'
            data-test-id={dataTestId}
            className={cn(styles.component, className, size && styles[size], {
                [styles.fullWidthScroll]: fullWidthScroll,
            })}
        >
            {titles.map((item, index) => {
                if (item.hidden) return null;

                return (
                    <KeyboardFocusable key={item.id}>
                        {(ref, focused) => (
                            <button
                                {...getTabListItemProps(index, ref)}
                                type='button'
                                className={cn(
                                    styles.title,
                                    {
                                        [styles.selected]: item.id === selectedId,
                                        [styles.disabled]: item.disabled,
                                    },
                                    item.toggleClassName,
                                )}
                            >
                                <span className={focused ? styles.focused : undefined}>
                                    {item.title}
                                </span>
                                {item.rightAddons && (
                                    <span className={styles.rightAddons}>{item.rightAddons}</span>
                                )}
                            </button>
                        )}
                    </KeyboardFocusable>
                );
            })}
            <div className={styles.line} ref={lineRef} />
        </div>
    );

    return scrollable ? (
        <ScrollableContainer
            activeChild={focusedTab || selectedTab}
            containerClassName={containerClassName}
            fullWidthScroll={fullWidthScroll}
        >
            {renderContent()}
        </ScrollableContainer>
    ) : (
        <div className={cn(styles.container, containerClassName)}>{renderContent()}</div>
    );
};

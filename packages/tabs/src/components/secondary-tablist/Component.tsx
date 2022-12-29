import React from 'react';
import cn from 'classnames';

import { Tag } from '@alfalab/core-components-tag';

import { useTabs } from '../../hooks/use-tabs';
import { SecondaryTabListProps, Styles } from '../../typings';
import { ScrollableContainer } from '../scrollable-container';

export const SecondaryTabList = ({
    styles = {},
    className,
    containerClassName,
    size,
    titles = [],
    selectedId = titles.length ? titles[0].id : undefined,
    scrollable = true,
    fullWidthScroll,
    tagSize = 'xs',
    onChange,
    dataTestId,
}: SecondaryTabListProps & Styles) => {
    const { focusedTab, selectedTab, getTabListItemProps } = useTabs({
        titles,
        selectedId,
        onChange,
    });

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
                    <Tag
                        {...getTabListItemProps(index)}
                        key={item.id}
                        className={cn(styles.title, item.toggleClassName)}
                        checked={item.id === selectedId}
                        size={tagSize}
                        rightAddons={item.rightAddons}
                    >
                        {item.title}
                    </Tag>
                );
            })}
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

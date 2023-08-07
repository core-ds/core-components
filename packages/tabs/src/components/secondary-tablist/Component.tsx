import React from 'react';
import cn from 'classnames';

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
    TagComponent,
}: SecondaryTabListProps & Styles) => {
    const { focusedTab, selectedTab, getTabListItemProps } = useTabs({
        titles,
        selectedId,
        onChange,
    });

    const renderContent = () => {
        if (!TagComponent) return null;

        return (
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
                        <TagComponent
                            {...getTabListItemProps(index)}
                            key={item.id}
                            className={cn(styles.title, item.toggleClassName)}
                            checked={item.id === selectedId}
                            size={tagSize}
                            rightAddons={item.rightAddons}
                        >
                            {item.title}
                        </TagComponent>
                    );
                })}
            </div>
        );
    };

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

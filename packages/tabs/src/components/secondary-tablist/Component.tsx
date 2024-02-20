import React from 'react';
import cn from 'classnames';

import { useTabs } from '../../hooks/use-tabs';
import { PlatformProps, SecondaryTabListProps, Styles } from '../../typings';
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
    platform,
    tagShape,
    tagView,
}: SecondaryTabListProps & Styles & PlatformProps) => {
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
                            shape={tagShape}
                            view={tagView}
                            key={item.id}
                            className={cn(styles.title, item.toggleClassName)}
                            checked={item.id === selectedId}
                            size={tagSize}
                            rightAddons={item.rightAddons}
                            leftAddons={item.leftAddons}
                            bottomAddons={item.bottomAddons}
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
            view='secondary'
            size={size}
            platform={platform}
        >
            {renderContent()}
        </ScrollableContainer>
    ) : (
        <div className={cn(styles.container, containerClassName)}>{renderContent()}</div>
    );
};

import React from 'react';
import { Skeleton } from '@balafla/core-components-skeleton';
import cn from 'classnames';

import { useTabs } from '../../hooks/use-tabs';
import { PlatformProps, SecondaryTabListProps, Styles } from '../../typings';
import { ScrollableContainer } from '../scrollable-container';

function getBorderRadius(
    shape?: SecondaryTabListProps['tagShape'],
    size?: SecondaryTabListProps['size'],
    isMobile?: boolean,
) {
    if (shape === 'rounded') {
        return 99;
    }

    if (size === 'xxs') return isMobile ? 8 : 6;
    if (size === 'xs' || size === 's') return isMobile ? 12 : 8;

    return isMobile ? 16 : 4;
}

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
    tagShape = 'rounded',
    tagView,
    inlineStyle,
    showSkeleton,
    skeletonProps,
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

                    const renderTab = () => (
                        <TagComponent
                            {...getTabListItemProps(index)}
                            shape={tagShape}
                            view={tagView}
                            key={item.id}
                            className={cn(styles.title, item.toggleClassName)}
                            checked={item.id === selectedId}
                            size={tagSize}
                            rightAddons={item.rightAddons}
                        >
                            {item.title}
                        </TagComponent>
                    );

                    return showSkeleton ? (
                        <Skeleton
                            {...skeletonProps}
                            className={cn(styles.skeleton, skeletonProps?.className)}
                            key={item.id}
                            visible={true}
                            style={{
                                ...skeletonProps?.style,
                                borderRadius: getBorderRadius(
                                    tagShape,
                                    tagSize as SecondaryTabListProps['size'],
                                    platform === 'mobile',
                                ),
                            }}
                        >
                            {renderTab()}
                        </Skeleton>
                    ) : (
                        renderTab()
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
            inlineStyle={inlineStyle}
            showSkeleton={showSkeleton}
        >
            {renderContent()}
        </ScrollableContainer>
    ) : (
        <div className={cn(styles.container, containerClassName)} style={inlineStyle}>
            {renderContent()}
        </div>
    );
};

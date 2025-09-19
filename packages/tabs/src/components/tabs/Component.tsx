import React, { cloneElement } from 'react';

import { type TabsProps } from '../../typings';

export const Tabs = ({
    TabList,
    className,
    containerClassName,
    size,
    children,
    selectedId,
    scrollable,
    collapsedTabsIds,
    fullWidthScroll = false,
    keepMounted = false,
    dataTestId,
    onChange,
    breakpoint,
    client,
    defaultMatchMediaValue,
    tagShape,
    tagView,
    showSkeleton = false,
    skeletonProps,
    textStyle,
    style,
    titleProps,
    ...restProps
}: Omit<TabsProps, 'view'>) => {
    const tabsArray = React.Children.toArray(children) as TabsProps['children'];

    const titles = tabsArray.map(
        ({
            props: {
                title,
                id,
                rightAddons,
                disabled,
                hidden,
                toggleClassName,
                dataTestId: toggleTestId,
                toggleRef,
            },
        }) => ({
            title,
            id,
            disabled,
            rightAddons,
            hidden,
            toggleClassName,
            dataTestId: toggleTestId,
            toggleRef,
            ...titleProps,
        }),
    );

    const tabs = tabsArray.filter(
        (tab) => tab.props.id === selectedId || tab.props.keepMounted || keepMounted,
    );

    return (
        <div className={className} {...restProps}>
            <TabList
                containerClassName={containerClassName}
                size={size}
                titles={titles}
                selectedId={selectedId}
                scrollable={scrollable}
                collapsedTabsIds={collapsedTabsIds}
                onChange={onChange}
                dataTestId={dataTestId}
                defaultMatchMediaValue={defaultMatchMediaValue}
                breakpoint={breakpoint}
                client={client}
                fullWidthScroll={fullWidthScroll}
                tagShape={tagShape}
                tagView={tagView}
                textStyle={textStyle}
                inlineStyle={style}
                showSkeleton={showSkeleton}
                skeletonProps={skeletonProps}
            />

            {tabs.map((tab) => cloneElement(tab, { hidden: tab.props.id !== selectedId }))}
        </div>
    );
};

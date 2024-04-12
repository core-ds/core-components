import React, { cloneElement } from 'react';

import { TabsProps } from '../../typings';

export const Tabs = ({
    TabList,
    className,
    containerClassName,
    size,
    defaultMatchMediaValue,
    children,
    selectedId,
    scrollable,
    collapsedTabsIds,
    fullWidthScroll = false,
    keepMounted = false,
    dataTestId,
    onChange,
    breakpoint = 1024,
    tagShape,
    tagView,
    textStyle,
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
                fullWidthScroll={fullWidthScroll}
                breakpoint={breakpoint}
                tagShape={tagShape}
                tagView={tagView}
                textStyle={textStyle}
            />

            {tabs.map((tab) => cloneElement(tab, { hidden: tab.props.id !== selectedId }))}
        </div>
    );
};

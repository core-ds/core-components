import React, { cloneElement } from 'react';

import { TabsProps } from '../../typings';

export const Tabs = ({
    TabList,
    className,
    containerClassName,
    size,
    defaultMatch,
    children,
    selectedId,
    scrollable,
    collapsible,
    collapsedTabsIds,
    fullWidthScroll = false,
    keepMounted = false,
    dataTestId,
    onChange,
    breakpoint = 1024,
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
            },
        }) => ({
            title,
            id,
            disabled,
            rightAddons,
            hidden,
            toggleClassName,
            dataTestId: toggleTestId,
        }),
    );

    const tabs = tabsArray.filter(
        (tab) => tab.props.id === selectedId || tab.props.keepMounted || keepMounted,
    );

    return (
        <div className={className}>
            <TabList
                containerClassName={containerClassName}
                size={size}
                titles={titles}
                selectedId={selectedId}
                scrollable={scrollable}
                collapsible={collapsible}
                collapsedTabsIds={collapsedTabsIds}
                onChange={onChange}
                dataTestId={dataTestId}
                defaultMatch={defaultMatch}
                fullWidthScroll={fullWidthScroll}
                breakpoint={breakpoint}
            />

            {tabs.map((tab) => cloneElement(tab, { hidden: tab.props.id !== selectedId }))}
        </div>
    );
};

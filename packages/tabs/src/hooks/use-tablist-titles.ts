import { useMemo } from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

import { TabListProps } from '../typings';

import { useCollapsibleElements } from './use-collapsible-elements';
import { useTabs } from './use-tabs';

export const useTablistTitles = ({
    titles = [],
    selectedId,
    collapsedTabsIds,
    onChange,
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
}: Pick<
    TabListProps,
    | 'titles'
    | 'selectedId'
    | 'collapsedTabsIds'
    | 'onChange'
    | 'defaultMatchMediaValue'
    | 'breakpoint'
    | 'client'
>) => {
    const { containerRef, addonRef, idsCollapsedElements } = useCollapsibleElements<
        HTMLDivElement,
        HTMLInputElement
    >('[role=tab]', [titles, collapsedTabsIds]);

    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    const tablistTitles = useMemo(() => {
        const idsCollapsedTitles: string[] = [];
        const idsCollapsed = idsCollapsedElements.concat(collapsedTabsIds || []);

        if (isDesktop) {
            const visibleTitles = titles.filter(({ id }) => !idsCollapsed.includes(String(id)));
            const lastVisibleTitle = collapsedTabsIds
                ? null
                : visibleTitles[visibleTitles.length - 1];

            idsCollapsed.forEach((id) => {
                if (selectedId === id && lastVisibleTitle) {
                    idsCollapsedTitles.push(String(lastVisibleTitle.id));
                }
                if (selectedId !== id) {
                    idsCollapsedTitles.push(id);
                }
            });
        }

        const titlesMapped = titles.map((title) => ({
            ...title,
            collapsed: idsCollapsedTitles.includes(String(title.id)),
            selected: title.id === selectedId,
        }));

        if (collapsedTabsIds?.length) {
            titlesMapped.sort((a, b) => {
                const hasA = collapsedTabsIds.includes(String(a.id));
                const hasB = collapsedTabsIds.includes(String(b.id));

                if (hasA === hasB) {
                    return 0;
                }

                return hasA ? 1 : -1;
            });
        }

        return titlesMapped.sort((a, b) => {
            if (a.collapsed === b.collapsed) {
                return 0;
            }

            return a.collapsed ? 1 : -1;
        });
    }, [collapsedTabsIds, idsCollapsedElements, isDesktop, titles, selectedId]);

    const { selectedTab, focusedTab, getTabListItemProps } = useTabs({
        titles: tablistTitles,
        selectedId,
        onChange,
    });

    return {
        containerRef,
        addonRef,
        tablistTitles,
        selectedTab,
        focusedTab,
        getTabListItemProps,
    };
};

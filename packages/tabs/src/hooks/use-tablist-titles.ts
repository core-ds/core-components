import { useMemo } from 'react';

import { useMedia } from '@alfalab/hooks';

import { TabListProps, TabsMatchMedia } from '../typings';

import { useCollapsibleElements } from './use-collapsible-elements';
import { useTabs } from './use-tabs';

export const useTablistTitles = ({
    titles = [],
    selectedId,
    collapsible,
    collapsedTabsIds,
    breakpoint,
    onChange,
}: Pick<TabListProps, 'titles' | 'selectedId' | 'collapsible' | 'collapsedTabsIds' | 'onChange'> &
    Required<Pick<TabListProps, 'breakpoint'>>) => {
    const { containerRef, addonRef, idsCollapsedElements } = useCollapsibleElements<
        HTMLDivElement,
        HTMLInputElement
    >('[role=tab]', [titles, collapsedTabsIds]);

    const [view] = useMedia<TabsMatchMedia>(
        [['desktop', `(min-width: ${breakpoint}px)`]],
        'desktop',
    );

    const tablistTitles = useMemo(() => {
        const idsCollapsedTitles: string[] = [];
        const idsCollapsed = idsCollapsedElements.concat(collapsedTabsIds || []);

        if (view === 'desktop' && collapsible) {
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
    }, [collapsedTabsIds, idsCollapsedElements, view, collapsible, titles, selectedId]);

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

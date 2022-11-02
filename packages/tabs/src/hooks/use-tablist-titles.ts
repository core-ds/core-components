import { useMemo } from 'react';

import { useMedia } from '@alfalab/hooks';

import { TabListProps, TabsMatchMedia } from '../typings';

import { useCollapsibleElements } from './use-collapsible-elements';
import { useTabs } from './use-tabs';

export const useTablistTitles = ({
    titles = [],
    selectedId,
    collapsible,
    onChange,
}: Pick<TabListProps, 'titles' | 'selectedId' | 'collapsible' | 'onChange'>) => {
    const { containerRef, addonRef, idsCollapsedElements } = useCollapsibleElements<
        HTMLDivElement,
        HTMLInputElement
    >('[role=tab]', [titles]);

    const [view] = useMedia<TabsMatchMedia>(
        [
            ['mobile', '(max-width: 767px)'],
            ['desktop', '(min-width: 768px)'],
        ],
        'desktop',
    );

    const tablistTitles = useMemo(() => {
        const idsCollapsedTitles: string[] = [];

        if (view === 'desktop' && collapsible) {
            const visibleTitles = titles.filter(
                ({ id }) => !idsCollapsedElements.includes(String(id)),
            );
            const lastVisibleTitle = visibleTitles[visibleTitles.length - 1];

            idsCollapsedElements.forEach((id) => {
                idsCollapsedTitles.push(
                    selectedId === id && lastVisibleTitle ? String(lastVisibleTitle.id) : id,
                );
            });
        }

        return titles.map((title) => ({
            ...title,
            collapsed: idsCollapsedTitles.includes(String(title.id)),
            selected: title.id === selectedId,
        }));
    }, [titles, collapsible, selectedId, idsCollapsedElements, view]);

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

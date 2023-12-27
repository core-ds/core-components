import {
    KeyboardEvent,
    MouseEvent,
    MutableRefObject,
    Ref,
    useCallback,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { getDataTestId } from '@alfalab/core-components-shared';

import { TabListTitle, UseTabsProps } from '../typings';

export function useTabs({ titles = [], selectedId, onChange }: UseTabsProps) {
    const [selectedTab, setSelectedTab] = useState<HTMLButtonElement | null>(null);
    const [focusedTab, setFocusedTab] = useState<HTMLButtonElement | null>(null);
    const itemRefs = useRef<HTMLButtonElement[]>([]);

    const handleItemRef = useCallback(
        (node: HTMLButtonElement, item: TabListTitle, index: number) => {
            if (node && item.id === selectedId) setSelectedTab(node);
            itemRefs.current[index] = node;
        },
        [selectedId],
    );

    const handleItemClick = useCallback(
        (event: MouseEvent, item: TabListTitle) => {
            if (onChange && item.id !== selectedId) {
                onChange(event, { selectedId: item.id });
            }
        },
        [onChange, selectedId],
    );

    const focusTab = useCallback(
        (position: 'prev' | 'next' | 'start' | 'end') => {
            const refs = itemRefs.current;

            const tabAvailable = (ref: HTMLButtonElement) => ref && !ref.disabled;

            if (refs.every((ref) => !tabAvailable(ref))) return;

            let focusedTabIndex = refs.findIndex((node) => document.activeElement === node);

            if (focusedTabIndex === -1) {
                focusedTabIndex = refs.findIndex((node) => node === selectedTab);
            }

            let newFocusIndex;

            switch (position) {
                case 'prev':
                    newFocusIndex = focusedTabIndex === 0 ? refs.length - 1 : focusedTabIndex - 1;
                    break;
                case 'next':
                    newFocusIndex = focusedTabIndex === refs.length - 1 ? 0 : focusedTabIndex + 1;
                    break;
                case 'start':
                    newFocusIndex = 0;
                    break;
                case 'end':
                    newFocusIndex = refs.length - 1;
                    break;
            }

            const shift = ['prev', 'end'].includes(position) ? -1 : 1;

            while (!tabAvailable(refs[newFocusIndex])) {
                newFocusIndex = (refs.length + newFocusIndex + shift) % refs.length;
            }

            refs[newFocusIndex].focus();

            setFocusedTab(refs[newFocusIndex]);
        },
        [selectedTab, itemRefs],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>) => {
            switch (event.key) {
                case 'ArrowLeft':
                    focusTab('prev');

                    event.preventDefault();
                    break;
                case 'ArrowRight':
                    focusTab('next');

                    event.preventDefault();
                    break;
                case 'Home':
                    focusTab('start');

                    event.preventDefault();
                    break;
                case 'End':
                    focusTab('end');

                    event.preventDefault();
                    break;
                default:
                    break;
            }
        },
        [focusTab],
    );

    const getTabListItemProps = (index: number, outerRef?: MutableRefObject<HTMLElement>) => {
        const item = titles[index];
        const itemSelected = item.id === selectedId;

        const refs: Array<Ref<HTMLElement>> = [
            (node: HTMLButtonElement) => {
                // eslint-disable-next-line no-param-reassign
                if (outerRef) outerRef.current = node;
                handleItemRef(node, item, index);
            },
        ];

        if (item.toggleRef) {
            refs.push(item.toggleRef);
        }

        return {
            role: 'tab',
            tabIndex: itemSelected ? 0 : -1,
            'aria-selected': itemSelected,
            selected: itemSelected,
            'data-test-id': getDataTestId(item.dataTestId, 'toggle'),
            disabled: item.disabled,
            ref: mergeRefs(refs),
            onKeyDown: handleKeyDown,
            onClick: (event?: MouseEvent) => handleItemClick(event as MouseEvent, item),
        };
    };

    return {
        getTabListItemProps,
        selectedTab,
        focusedTab,
    };
}

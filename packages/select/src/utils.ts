import {
    cloneElement,
    isValidElement,
    type ReactNode,
    type RefObject,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    fnUtils,
    getDataTestId,
    getElementWindow,
    useIsMounted,
} from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { DEFAULT_SEPARATOR } from './consts';
import {
    type BaseSelectProps,
    type GroupShape,
    type OptionShape,
    type OptionsListProps,
} from './typings';

export const isGroup = (item: OptionShape | GroupShape): item is GroupShape =>
    Object.prototype.hasOwnProperty.call(item, 'options');

export const isOptionShape = (item: OptionShape | string | null): item is OptionShape =>
    !!item && Object.prototype.hasOwnProperty.call(item, 'key');

export const joinOptions = ({
    selected,
    selectedMultiple,
    valueSeparator = DEFAULT_SEPARATOR,
}: {
    selected?: OptionShape;
    selectedMultiple?: OptionShape[];
    valueSeparator?: string;
}) => {
    const options = selectedMultiple || (selected ? [selected] : []);

    if (!options.length) return null;

    return options.reduce((acc: Array<ReactNode | string>, option: OptionShape, index: number) => {
        if (isValidElement(option.content)) {
            acc.push(cloneElement(option.content, { key: option.key }));
        } else {
            acc.push(option.content);
        }

        if (index < options.length - 1) acc.push(valueSeparator);

        return acc;
    }, []);
};

// За один проход делает список пунктов меню плоским и находит выбранные пункты по ключу
export function processOptions(
    options: BaseSelectProps['options'],
    selected: BaseSelectProps['selected'] = [],
    filterFn: (option: OptionShape | GroupShape) => boolean = () => true,
    filterGroup = false,
) {
    const flatOptions: OptionShape[] = [];
    const filteredOptions: BaseSelectProps['options'] = [];

    const selectedArray = Array.isArray(selected) ? selected : [selected];
    const selectedOptions = selectedArray.filter(isOptionShape);
    const selectedKeys = selectedArray.filter(
        (option): option is string => typeof option === 'string',
    );

    const isSelected = (option: OptionShape) => selectedKeys.includes(option.key);

    const process = (option: OptionShape | GroupShape) => {
        const isGroupOption = isGroup(option);

        if (!isGroupOption && isSelected(option)) {
            selectedOptions.push(option);
        }

        if (!filterFn(option)) return false;

        if (isGroupOption) {
            if (filterGroup) {
                Array.prototype.push.apply(flatOptions, option.options);
            }
        } else {
            flatOptions.push(option);
        }

        return true;
    };

    options.forEach((option) => {
        if (isGroup(option)) {
            const group: GroupShape = {
                ...option,
                options: [],
            };

            option.options.forEach((groupOption) => {
                const matched = process(groupOption);

                if (matched) group.options.push(groupOption);
            });

            if (group.options.length) {
                filteredOptions.push(group);

                return;
            }

            if (!filterGroup) return;
        }
        const matched = process(option);

        if (matched) filteredOptions.push(option);
    });

    return { filteredOptions, flatOptions, selectedOptions };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
type useVisibleOptionsArgs = {
    /**
     * Количество видимых пунктов
     */
    visibleOptions: number;

    /**
     * Реф на контейнер с пунтами меню
     */
    listRef: RefObject<HTMLElement>;

    /**
     * Флаг открытия меню
     */
    open?: boolean;

    /**
     * Позволяет вызвать пересчет высоты
     */
    invalidate?: unknown;

    /**
     * Список вариантов выбора
     */
    options?: Array<OptionShape | GroupShape>;

    /**
     * Максимальный размер варианта выбора
     */
    size?: Extract<OptionsListProps['size'], number>;

    /**
     * Учитывать действительное число вариантов выбора
     */
    actualOptionsCount?: boolean;
};

function measureVisibleOptionsHeight({
    list,
    visibleOptions,
    options,
    size,
    actualOptionsCount,
}: {
    list: HTMLElement;
    visibleOptions: number;
    options?: Array<OptionShape | GroupShape>;
    size?: Extract<OptionsListProps['size'], number>;
    actualOptionsCount?: boolean;
}) {
    const measureOptionHeight = (element: HTMLElement) =>
        typeof size === 'number' ? Math.min(element.clientHeight, size) : element.clientHeight;

    const childCount = list.children.length;
    const optionsNodes = ([] as HTMLElement[]).slice.call(list.children, 0, visibleOptions + 1);

    let height = optionsNodes
        .slice(0, visibleOptions)
        .reduce((acc, child) => acc + measureOptionHeight(child), 0);

    if (visibleOptions < childCount) {
        const lastVisibleOptionHeight = measureOptionHeight(optionsNodes[optionsNodes.length - 1]);

        // Если кол-во опций больше visibleOptions на 1, то показываем все опции, иначе добавляем половинку
        height += Math.round(
            childCount - visibleOptions === 1
                ? lastVisibleOptionHeight
                : lastVisibleOptionHeight / 2,
        );
    } else if (visibleOptions > childCount && actualOptionsCount && typeof size === 'number') {
        const actualCount = (options ?? []).reduce(
            (sum, option) => sum + 1 + (isGroup(option) ? option.options.length : 0),
            0,
        );

        height =
            Math.min(actualCount === 0 ? /** empty placeholder */ 1 : actualCount, visibleOptions) *
            size;

        if (visibleOptions < actualCount) {
            height += size / 2;
        }
    }

    const win = getElementWindow(list);

    height += ['::before', '::after']
        .map((pseudo) => parseFloat(win.getComputedStyle(list, pseudo).paddingTop) || 0)
        .reduce((a, b) => a + b);

    return height;
}

function observeOptionsSize(list: HTMLElement, onResize: () => void) {
    const win = getElementWindow(list);
    let frameId = 0;

    /*
     * Пересчитываем в следующем кадре: замер прямо в колбэке ResizeObserver
     * вклинивается в позиционирование поповера, и список остаётся скрытым.
     */
    const scheduleResize = () => {
        win.cancelAnimationFrame(frameId);
        frameId = win.requestAnimationFrame(onResize);
    };

    const resizeObserver = win.ResizeObserver ? new win.ResizeObserver(scheduleResize) : null;

    const observeOptions = () => {
        if (!resizeObserver) return;

        resizeObserver.disconnect();
        Array.from(list.children).forEach((option) => {
            resizeObserver.observe(option);
        });
    };

    observeOptions();

    const mutationObserver = new win.MutationObserver(() => {
        observeOptions();
        scheduleResize();
    });

    mutationObserver.observe(list, { childList: true });

    return () => {
        win.cancelAnimationFrame(frameId);
        resizeObserver?.disconnect();
        mutationObserver.disconnect();
    };
}

// copy-paste of original `useVisibleOptions` before https://github.com/core-ds/core-components/pull/1368
export function useVirtualVisibleOptions({
    visibleOptions,
    listRef,
    open,
    invalidate,
    options,
    size,
    actualOptionsCount,
}: useVisibleOptionsArgs) {
    const [height, setHeight] = useState<number>();

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const list = listRef.current;

        if (open && list && visibleOptions > 0) {
            const applyHeight = () => {
                setHeight(
                    measureVisibleOptionsHeight({
                        list,
                        visibleOptions,
                        options,
                        size,
                        actualOptionsCount,
                    }),
                );
            };

            applyHeight();

            return observeOptionsSize(list, applyHeight);
        }

        return fnUtils.noop;
    }, [actualOptionsCount, listRef, open, options, size, visibleOptions, invalidate]);

    return height;
}

export function useVisibleOptions({
    visibleOptions,
    listRef,
    open,
    options,
    size,
    actualOptionsCount,
}: useVisibleOptionsArgs) {
    const [, runIfMounted] = useIsMounted();
    const [measured, setMeasured] = useState(false);
    const [height, setHeight] = useState<number | undefined>();

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const list = listRef.current;

        if (open && list && visibleOptions > 0) {
            const applyHeight = () => {
                setHeight(
                    measureVisibleOptionsHeight({
                        list,
                        visibleOptions,
                        options,
                        size,
                        actualOptionsCount,
                    }),
                );
                setMeasured(true);
            };

            applyHeight();

            const disconnect = observeOptionsSize(list, applyHeight);

            return () => {
                disconnect();
                runIfMounted(() => setMeasured(false));
            };
        }

        return fnUtils.noop;
    }, [actualOptionsCount, listRef, open, options, size, visibleOptions, runIfMounted]);

    return [measured, height] as const;
}

export function defaultFilterFn(optionText: string, search: string) {
    if (!search) return true;

    return optionText.toLowerCase().includes(search.toLowerCase());
}

export function defaultGroupAccessor(option: GroupShape) {
    return option.label;
}

export function defaultAccessor(option: OptionShape) {
    if (typeof option.content === 'string') return option.content;
    if (typeof option.value === 'string') return option.value;

    return option.key;
}

// TODO: перенести
export function usePrevious<T>(value: T) {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export function getSelectTestIds(dataTestId: string) {
    return {
        select: dataTestId,
        option: getDataTestId(dataTestId, 'option'),
        optionsList: getDataTestId(dataTestId, 'options-list'),
        clearButton: getDataTestId(dataTestId, 'options-list-clear'),
        applyButton: getDataTestId(dataTestId, 'options-list-apply'),
        field: getDataTestId(dataTestId, 'field'),
        fieldFormControl: getDataTestId(dataTestId, 'field-form-control'),
        fieldLeftAddons: getDataTestId(dataTestId, 'field-form-control-left-addons'),
        fieldRightAddons: getDataTestId(dataTestId, 'field-form-control-right-addons'),
        fieldError: getDataTestId(dataTestId, 'field-form-control-error-message'),
        fieldHint: getDataTestId(dataTestId, 'field-form-control-hint'),
        fieldClearIcon: getDataTestId(dataTestId, 'field-clear-icon'),
        searchInput: getDataTestId(dataTestId, 'search'),
        searchFormControl: getDataTestId(dataTestId, 'search-form-control'),
        searchInner: getDataTestId(dataTestId, 'search-form-control-inner'),
        searchLeftAddons: getDataTestId(dataTestId, 'search-form-control-left-addons'),
        searchRightAddons: getDataTestId(dataTestId, 'search-form-control-right-addons'),
        searchError: getDataTestId(dataTestId, 'search-form-control-error-message'),
        searchHint: getDataTestId(dataTestId, 'search-form-control-hint'),

        bottomSheet: getDataTestId(dataTestId, 'bottom-sheet'),
        bottomSheetHeader: getDataTestId(dataTestId, 'bottom-sheet-header'),
        bottomSheetContent: getDataTestId(dataTestId, 'bottom-sheet-content'),

        modal: getDataTestId(dataTestId, 'modal'),
        modalHeader: getDataTestId(dataTestId, 'modal-header'),
        modalContent: getDataTestId(dataTestId, 'modal-content'),
    };
}

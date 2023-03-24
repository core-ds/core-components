import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useMedia } from '@alfalab/hooks';

import { BaseSelectProps, OptionShape, processOptions } from '../..';

import { OptionsListWithApply } from './options-list-with-apply';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type useSelectWithApplyProps = {
    /**
     * Список выбранных пунктов
     */
    selected: BaseSelectProps['selected'];

    /**
     * Список вариантов выбора
     */
    options: BaseSelectProps['options'];

    /**
     * Обработчик выбора
     */
    onChange: BaseSelectProps['onChange'];

    /**
     * Компонент выпадающего меню
     */
    OptionsList?: BaseSelectProps['OptionsList'];

    /**
     * Показывать кнопку очистки
     */
    showClear?: boolean;

    /**
     * Показывать пункт "Выбрать все"
     */
    showSelectAll?: boolean;

    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const SELECT_ALL_KEY = 'select_all';

const selectAllOption = { key: SELECT_ALL_KEY, content: 'Выбрать все' };

export function useSelectWithApply({
    options,
    selected,
    onChange = () => null,
    OptionsList,
    showClear = false,
    showSelectAll = false,
    breakpoint = 1024,
}: useSelectWithApplyProps) {
    const { flatOptions, selectedOptions } = useMemo(
        () => processOptions(options, selected),
        [options, selected],
    );

    const [selectedDraft, setSelectedDraft] = useState<OptionShape[]>(selectedOptions);

    const selectedOptionsRef = useRef<OptionShape[]>(selectedOptions);

    const handleApply = useCallback(() => {
        onChange({
            selected: selectedDraft[0],
            selectedMultiple: selectedDraft,
            initiator: null,
        });
    }, [onChange, selectedDraft]);

    const handleClear = useCallback(() => {
        setSelectedDraft([]);
        onChange({
            selected: null,
            selectedMultiple: [],
            initiator: null,
        });
    }, [onChange]);

    const handleChange: Required<BaseSelectProps>['onChange'] = useCallback(
        ({ initiator, ...restArgs }) => {
            if (!initiator) {
                onChange({
                    initiator: null,
                    ...restArgs,
                });

                return;
            }

            const initiatorSelected =
                selectedDraft.includes(initiator) ||
                (initiator.key === SELECT_ALL_KEY && selectedDraft.length === flatOptions.length);

            if (initiator.key === SELECT_ALL_KEY) {
                setSelectedDraft(initiatorSelected ? [] : (flatOptions as OptionShape[]));
            } else {
                setSelectedDraft(
                    initiatorSelected
                        ? selectedDraft.filter((o) => o !== initiator)
                        : selectedDraft.concat(initiator),
                );
            }
        },
        [flatOptions, onChange, selectedDraft],
    );

    const handleClose = useCallback(() => {
        setSelectedDraft(selectedOptionsRef.current);
    }, []);

    useEffect(() => {
        setSelectedDraft(selectedOptions);
        selectedOptionsRef.current = selectedOptions;
    }, [selectedOptions]);

    const memoizedOptions = useMemo(
        () => (showSelectAll ? [selectAllOption, ...options] : options),
        [options, showSelectAll],
    );

    const [view] = useMedia(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return {
        OptionsList: OptionsListWithApply,
        optionsListProps: {
            OptionsList,
            showClear: showClear || selectedDraft.length > 0 || selectedOptions.length > 0,
            onClear: handleClear,
            onApply: handleApply,
            onClose: handleClose,
            selectedDraft,
            view,
        },
        allowUnselect: true,
        multiple: true,
        options: memoizedOptions,
        onChange: handleChange,
        selected,
    };
}

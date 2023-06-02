import { MouseEvent, Ref, useCallback, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

export type UseCalendarProps = {
    /**
     * Выбранный день
     */
    selected?: number;

    /**
     * Обработчик выбора дня
     */
    onChange?: (date: number) => void;
};

export function useCalendar({ selected, onChange }: UseCalendarProps) {
    const [highlighted, setHighlighted] = useState<number>();

    const dateRefs = useRef<HTMLElement[]>([]);
    const rootRef = useRef<HTMLDivElement>(null);

    const handleDayClick = (event: number) => {
        if (event && onChange) {
            onChange(event);
        }
    };

    const handleDayMouseEnter = useCallback((event: MouseEvent<HTMLTableCellElement>) => {
        const { date } = (event.currentTarget as HTMLTableCellElement).dataset;

        setHighlighted(date ? +date : undefined);
    }, []);

    const handleDayMouseLeave = useCallback(() => {
        setHighlighted(undefined);
    }, []);

    const handleDateRef = useCallback((node: HTMLElement, index: number) => {
        dateRefs.current[index] = node;
    }, []);

    let focusableDayIsSet = false;

    const getDayProps = (day: number) => {
        const daySelected = selected === day;
        let canFocus = daySelected;

        // Если день не выбран — фокус должен начинаться с первого доступного дня месяца
        if (!selected && !focusableDayIsSet) {
            focusableDayIsSet = true;
            canFocus = true;
        }

        return {
            'data-date': day,
            'aria-selected': daySelected,
            tabIndex: canFocus ? 0 : -1,
            onClick: handleDayClick,
            selected: daySelected,
            onMouseEnter: handleDayMouseEnter,
            onMouseLeave: handleDayMouseLeave,
            ref: (node: HTMLTableCellElement) => {
                handleDateRef(node, day - 1);
            },
        };
    };

    const getRootProps = ({ ref = null }: { ref?: Ref<HTMLDivElement> }) => ({
        ref: mergeRefs([ref, rootRef]),
        tabIndex: -1,
    });

    return {
        getDayProps,
        getRootProps,
        highlighted,
    };
}

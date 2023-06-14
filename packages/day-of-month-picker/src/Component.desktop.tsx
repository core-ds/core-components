import React, {
    FocusEvent,
    forwardRef,
    KeyboardEvent,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Popover } from '@alfalab/core-components-popover';

import { DayInputField } from './components/day-input-field/DayInputField';
import { DaysTable } from './components/days-table';

import styles from './desktop.module.css';

export type DayOfMontPickerDesktopProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Выбранный день
     */
    value?: number;

    /**
     * Обработчик выбора дня
     */
    onChange: (day: number) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;
};

export const DayOfMonthPickerDesktop = forwardRef<HTMLDivElement, DayOfMontPickerDesktopProps>(
    ({ className, value, onChange, dataTestId, error, hint }, ref) => {
        const [show, setShow] = useState(false);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const popoverRef = useRef<HTMLDivElement>(null);

        const handleOpenCalendar = () => {
            setShow(true);
        };

        useEffect(() => {
            setShow(false);
        }, [value]);

        const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
            const target = event.relatedTarget || document.activeElement;

            if (!popoverRef.current?.contains(target)) {
                setShow(false);
            }
        }, []);

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLDivElement>) => {
                setShow(true);

                if (!show && event.target.tagName !== 'INPUT' && popoverRef.current) {
                    popoverRef.current.focus();
                }
            },
            [show],
        );

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLDivElement>) => {
                if ((event.target as HTMLElement).tagName === 'INPUT' && event.key === 'Enter') {
                    setShow(!show);
                }

                if (event.key === 'Escape') {
                    setShow(false);
                }
            },
            [show],
        );

        return (
            <div
                ref={ref}
                className={className}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                role='button'
                tabIndex={0}
            >
                <DayInputField
                    inputWrapperRef={inputWrapperRef}
                    value={value ?? ''}
                    handleToggle={handleOpenCalendar}
                    error={error}
                    hint={hint}
                />

                <Popover
                    dataTestId='day-of-month-popover'
                    ref={popoverRef}
                    open={show}
                    anchorElement={inputWrapperRef.current as HTMLElement}
                    popperClassName={styles.calendarContainer}
                    offset={[0, 4]}
                    withTransition={false}
                    zIndex={1}
                    position='bottom-end'
                >
                    <div className={styles.component} data-test-id={dataTestId}>
                        <div className={styles.container}>
                            <DaysTable onClick={onChange} selectedDay={value} />
                        </div>
                    </div>
                </Popover>
            </div>
        );
    },
);

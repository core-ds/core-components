import React, {
    FocusEvent,
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Input } from '@alfalab/core-components-input';
import { Popover } from '@alfalab/core-components-popover';
import { Typography } from '@alfalab/core-components-typography';
import CalendarMIcon from '@alfalab/icons-glyph/CalendarMIcon';

import { DaysTable } from './components/days-table';
import { useCalendar } from './useCalendar';

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
    onChange?: (date?: number) => void;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};

export const DayOfMonthPickerDesktop = forwardRef<HTMLDivElement, DayOfMontPickerDesktopProps>(
    ({ className, value, onChange, dataTestId, responsive }, ref) => {
        const selected = useMemo(() => value ?? undefined, [value]);
        const { getDayProps, getRootProps, highlighted } = useCalendar({
            selected,
            onChange,
        });
        const [show, setShow] = useState(false);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const popoverRef = useRef<HTMLDivElement>(null);

        const handleToggle = () => {
            setShow((prev) => !prev);
        };

        useEffect(() => {
            setShow(false);
        }, [value]);

        const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
            const target = (event.relatedTarget || document.activeElement) as HTMLElement;

            if (popoverRef.current?.contains(target) === false) {
                setShow(false);
            }
        }, []);

        return (
            <div onBlur={handleBlur}>
                <Input
                    wrapperRef={inputWrapperRef}
                    value={`${value === 31 ? 'В последний день месяца' : value}`}
                    block={true}
                    readOnly={true}
                    onClick={handleToggle}
                    label='Какого числа'
                    size='m'
                    rightAddons={
                        <IconButton
                            view='primary'
                            icon={CalendarMIcon}
                            size='s'
                            dataTestId='icon'
                        />
                    }
                />

                <Popover
                    ref={popoverRef}
                    open={show}
                    anchorElement={inputWrapperRef.current as HTMLElement}
                    popperClassName={cn(styles.calendarContainer, {
                        [styles.calendarResponsive]: responsive,
                    })}
                    offset={[0, 4]}
                    withTransition={false}
                    zIndex={1}
                    position='bottom-end'
                >
                    <div
                        {...getRootProps({ ref })}
                        className={cn('cc-calendar', styles.component, className, {
                            [styles.responsive]: responsive,
                        })}
                        data-test-id={dataTestId}
                    >
                        <div className={cn(styles.container)}>
                            <DaysTable
                                highlighted={highlighted}
                                getDayProps={getDayProps}
                                responsive={responsive}
                            />
                            <div
                                className={cn(styles.lastDay, {
                                    [styles.lastDaySelected]: value === 31,
                                })}
                            >
                                <Typography.Text
                                    color={`${value === 31 ? 'primary-inverted' : 'primary'}`}
                                    onClick={() => onChange?.(31)}
                                >
                                    В последний день месяца
                                </Typography.Text>
                            </div>
                        </div>
                    </div>
                </Popover>
            </div>
        );
    },
);

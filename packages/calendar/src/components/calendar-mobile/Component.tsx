import React, { forwardRef } from 'react';
import { ModalResponsive } from '@alfalab/core-components-modal';
import { Button } from '@alfalab/core-components-button';

import { Calendar, CalendarProps } from '../..';
import { useControlled } from './utils';

import styles from './index.module.css';

export type CalendarMobileProps = CalendarProps & {
    /**
     * Управление видимостью модалки
     */
    open: boolean;

    /**
     * Обработчик открытия модалки
     */
    onOpen?: () => void;

    /**
     * Обработчик закрытия модалки
     */
    onClose?: () => void;
};

export const CalendarMobile = forwardRef<HTMLDivElement, CalendarMobileProps>(
    (
        {
            className,
            defaultView = 'days',
            selectorView = 'full',
            value,
            offDays,
            events,
            onChange,
            dataTestId,
            open,
            onClose,
            onOpen,
        },
        ref,
    ) => {
        const [openValue, setOpenValueIfUncontrolled] = useControlled(open, false);

        const handleOpen = () => {
            if (onOpen) {
                onOpen();
            } else {
                setOpenValueIfUncontrolled(true);
            }
        };

        const handleClose = () => {
            if (onClose) {
                onClose();
            } else {
                setOpenValueIfUncontrolled(false);
            }
        };

        return (
            <div className={className} ref={ref}>
                <Button onClick={handleOpen} style={{ margin: '15px' }} id='button-1'>
                    Открыть календарь
                </Button>
                <ModalResponsive open={openValue} onClose={handleClose} dataTestId={dataTestId}>
                    <ModalResponsive.Header
                        hasCloser={true}
                        title='Название инпута'
                        align='center'
                        leftAddons={<div />}
                    />
                    <ModalResponsive.Content>
                        <Calendar
                            value={value}
                            onChange={onChange}
                            offDays={offDays}
                            events={events}
                            defaultView={defaultView}
                            selectorView={selectorView}
                            className={styles.calendar}
                        />
                    </ModalResponsive.Content>
                    <ModalResponsive.Footer>
                        {value ? (
                            <Button view='primary' size='s' block={true} onClick={handleClose}>
                                Выбрать
                            </Button>
                        ) : (
                            <Button view='secondary' size='s' block={true} onClick={handleClose}>
                                Отмена
                            </Button>
                        )}
                    </ModalResponsive.Footer>
                </ModalResponsive>
            </div>
        );
    },
);

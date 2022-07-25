import React from 'react';
import { Modal } from '@alfalab/core-components-modal/esm';
import { Button } from '@alfalab/core-components-button/cssm';
import { Calendar, CalendarMobile } from '@alfalab/core-components-calendar/modern';
import { Alert as CoreAlert } from '@alfalab/core-components-alert/esm';
import { Plate } from '@alfalab/core-components-plate';
import { OtherComponent } from '../OtherComponent';

export const Component = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Modal open={open}>
                <Modal.Content>
                    <Calendar />
                    <CalendarMobile />
                    <CoreAlert>Alert!!!</CoreAlert>
                    <Plate>Plate</Plate>
                    <OtherComponent />
                </Modal.Content>
            </Modal>

            <Button onClick={() => setOpen()}>Open modal</Button>
        </div>
    );
};

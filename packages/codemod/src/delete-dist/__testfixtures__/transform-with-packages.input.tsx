import React from 'react';

import { Alert as CoreAlert } from '@alfalab/core-components-alert/dist/esm';
import { Button } from '@alfalab/core-components-button/dist/cssm';
import { Calendar, CalendarMobile } from '@alfalab/core-components-calendar/dist/modern';
import { Modal } from '@alfalab/core-components-modal/dist/esm';
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

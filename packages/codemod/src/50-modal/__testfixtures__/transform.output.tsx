import React, {Fragment} from 'react';

import { Modal } from '@alfalab/core-components-modal';
import { ModalDesktop } from '@alfalab/core-components-modal/desktop';

export const Component = () => (
    <Fragment>
        <Modal size={500} open={false} />
        <Modal size={500} open={false} />
        <ModalDesktop size={500} open={false} />
        <ModalDesktop size={500} open={false} />

        <Modal size={600} open={false} />
        <Modal size={600} open={false} />
        <ModalDesktop size={600} open={false} />
        <ModalDesktop size={600} open={false} />

        <Modal size={800} open={false} />
        <Modal size={800} open={false} />
        <ModalDesktop size={800} open={false} />
        <ModalDesktop size={800} open={false} />

        <Modal size={1140} open={false} />
        <Modal size={1140} open={false} />
        <ModalDesktop size={1140} open={false} />
        <ModalDesktop size={1140} open={false} />
    </Fragment>
);

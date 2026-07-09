import React, {Fragment} from 'react';

import { Modal } from '@alfalab/core-components-modal';
import { ModalDesktop } from '@alfalab/core-components-modal/desktop';

export const Component = () => (
    <Fragment>
        <Modal size="s" open={false} />
        <Modal size={"s"} open={false} />
        <ModalDesktop size="s" open={false} />
        <ModalDesktop size={"s"} open={false} />

        <Modal size="m" open={false} />
        <Modal size={"m"} open={false} />
        <ModalDesktop size="m" open={false} />
        <ModalDesktop size={"m"} open={false} />

        <Modal size="l" open={false} />
        <Modal size={"l"} open={false} />
        <ModalDesktop size="l" open={false} />
        <ModalDesktop size={"l"} open={false} />

        <Modal size="xl" open={false} />
        <Modal size={"xl"} open={false} />
        <ModalDesktop size="xl" open={false} />
        <ModalDesktop size={"xl"} open={false} />
    </Fragment>
);

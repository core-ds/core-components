/* eslint-disable */
import React from 'react';

import { Modal, ModalProps } from '@alfalab/core-components/modal';

import { ModalContext } from '@alfalab/core-components/modal/shared';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Modal open={false as ModalProps['open']}>
                <Modal.Content></Modal.Content>
            </Modal>
        </React.Fragment>
    );
};

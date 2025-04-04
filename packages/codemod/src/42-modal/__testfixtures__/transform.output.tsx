/* eslint-disable */
import React from 'react';

import { Modal, ModalProps } from '@balafla/core-components/modal';

import { ModalContext } from '@balafla/core-components/modal/shared';

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

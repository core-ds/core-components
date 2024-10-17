import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { getComponentHeader } from '../../desktop/components/utils/getCustomHeader';
import { ModalByCenterProps } from '../../desktop/types/props';

import styles from './base-universal-modal-content.module.css';

type BaseUniversalModalContentProps = {
    preset: ModalByCenterProps['preset'];
    header: ReactNode;
} & Pick<BaseModalProps, 'children'>;

/**
 * Для Universal Modal используется 2 сущности Drawer и Base Modal.
 * Этот компонент содержит общий код передаваемый в эти сущности.
 */
export const BaseUniversalModalContent: FC<BaseUniversalModalContentProps> = (props) => {
    const { preset, header, children } = props;

    return (
        <Scrollbar
            className={styles.scrollbarWrapper}
            verticalBarClassName={styles.verticalBarContainer}
        >
            {getComponentHeader(preset, header)}
            <div
                className={cn(styles.content, {
                    [styles.resetPaddingTop]: preset || header,
                })}
            >
                {children}
            </div>
        </Scrollbar>
    );
};

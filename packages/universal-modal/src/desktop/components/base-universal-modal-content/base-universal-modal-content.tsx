import React, { FC, useContext, useEffect, useRef } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { ResponsiveContext } from '../../../ResponsiveContext';
import { ModalByCenterProps } from '../../types/props';
import { ModalCustomFooter } from '../customs/modal-custom-footer/modalCustomFooter';
import { ModalCustomHeader } from '../customs/modal-custom-header/modalCustomHeader';

import styles from './base-universal-modal-content.module.css';

type BaseUniversalModalContentProps = {
    preset: ModalByCenterProps['preset'];
    footerPreset: ModalByCenterProps['footerPreset'];
    wheelDeltaY: number;
    onClose?: () => void;
} & Pick<BaseModalProps, 'children'>;

/**
 * Для Universal Modal используется 2 сущности Drawer и Base Modal.
 * Этот компонент содержит общий код передаваемый в эти сущности.
 */
export const BaseUniversalModalContent: FC<BaseUniversalModalContentProps> = (props) => {
    const { preset, footerPreset, children, wheelDeltaY, onClose } = props;
    const { setModalHeaderHighlighted, setModalFooterHighlighted } =
        useContext(ResponsiveContext) || {};
    const scrollableNodeRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;
        const { scrollTop } = target;

        const isElementFullScrolled =
            target.scrollHeight - target.scrollTop === target.clientHeight;

        if (setModalHeaderHighlighted) {
            if (scrollTop > 0) {
                setModalHeaderHighlighted(true);
            } else {
                setModalHeaderHighlighted(false);
            }
        }

        if (setModalFooterHighlighted) {
            if (isElementFullScrolled) {
                setModalFooterHighlighted(false);
            } else {
                setModalFooterHighlighted(true);
            }
        }
    };

    useEffect(() => {
        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.scrollBy({
                top: wheelDeltaY,
            });
        }
    }, [wheelDeltaY]);

    return (
        <Scrollbar
            className={styles.scrollbarWrapper}
            verticalBarClassName={styles.verticalBarContainer}
            scrollableNodeProps={{ ref: scrollableNodeRef, className: styles.scrollContentWrapper }}
            onContentScroll={handleScroll}
            contentNodeProps={{ className: styles.scrollbarContainer }}
        >
            <ModalCustomHeader preset={preset} onClose={onClose} />
            {children}
            <ModalCustomFooter preset={footerPreset} />
        </Scrollbar>
    );
};

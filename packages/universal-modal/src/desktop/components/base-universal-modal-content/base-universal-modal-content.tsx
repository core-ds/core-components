import React, { FC, useEffect, useRef, useState } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { ModalByCenterProps } from '../../types/props';
import { ModalCustomFooter } from '../customs/modal-custom-footer/modalCustomFooter';
import { ModalCustomHeader } from '../customs/modal-custom-header/modalCustomHeader';

import styles from './base-universal-modal-content.module.css';

type BaseUniversalModalContentProps = {
    preset: ModalByCenterProps['preset'];
    footerPreset: ModalByCenterProps['footerPreset'];
    width: number;
    wheelDeltaY: number;
    onClose?: () => void;
} & Pick<BaseModalProps, 'children'>;

/**
 * Для Universal Modal используется 2 сущности Drawer и Base Modal.
 * Этот компонент содержит общий код передаваемый в эти сущности.
 */
export const BaseUniversalModalContent: FC<BaseUniversalModalContentProps> = (props) => {
    const { preset, footerPreset, children, width, wheelDeltaY, onClose } = props;
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const scrollableNodeRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;

        setScrollPosition(target.scrollTop);
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
            <ModalCustomHeader
                preset={preset}
                scrollPosition={scrollPosition}
                width={width}
                onClose={onClose}
            />
            {children}
            <ModalCustomFooter
                preset={footerPreset}
                scrollPosition={scrollPosition}
                width={width}
            />
        </Scrollbar>
    );
};

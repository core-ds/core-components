import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { ModalCustomFooter } from '../../desktop/components/modal-custom-footer/modalCustomFooter';
import { ModalCustomHeader } from '../../desktop/components/modal-custom-header/modalCustomHeader';
import { ModalByCenterProps } from '../../desktop/types/props';

import styles from './base-universal-modal-content.module.css';

type BaseUniversalModalContentProps = {
    preset: ModalByCenterProps['preset'];
    footerPreset: ModalByCenterProps['footerPreset'];
    header: ReactNode;
    footer: ReactNode;
    width: number;
    wheelDeltaY: number;
    onClose?: () => void;
} & Pick<BaseModalProps, 'children'>;

/**
 * Для Universal Modal используется 2 сущности Drawer и Base Modal.
 * Этот компонент содержит общий код передаваемый в эти сущности.
 */
export const BaseUniversalModalContent: FC<BaseUniversalModalContentProps> = (props) => {
    const { preset, header, footerPreset, footer, children, width, wheelDeltaY, onClose } = props;
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
                header={header}
                scrollPosition={scrollPosition}
                width={width}
                onClose={onClose}
            />
            <div className={styles.children}>{children}</div>
            <ModalCustomFooter
                preset={footerPreset}
                footer={footer}
                scrollPosition={scrollPosition}
                width={width}
            />
        </Scrollbar>
    );
};

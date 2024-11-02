import React, { FC, useContext, useEffect, useRef } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { ResponsiveContext } from '../../../ResponsiveContext';
import { SCROLLBAR_DEFAULT_GAP } from '../../constants/types';
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
    const scrollbarContentNodeRef = useRef<HTMLDivElement>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const headerElementRef = useRef<HTMLDivElement | null>(null);
    const footerElementRef = useRef<HTMLDivElement | null>(null);

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
            } else if (scrollTop > 0) {
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

    // операции с DOM дорогие, поэтому получаем ссылки на элементы при первом рендере
    useEffect(() => {
        if (scrollbarContentNodeRef.current) {
            headerElementRef.current =
                scrollbarContentNodeRef.current.querySelector<HTMLDivElement>(
                    'div[data-name="modalHeaderDesktop"]',
                );
            footerElementRef.current =
                scrollbarContentNodeRef.current.querySelector<HTMLDivElement>(
                    'div[data-name="modalFooterDesktop"]',
                );
        }
    }, []);

    // расчет размера полосы прокрутки
    useEffect(() => {
        if (scrollbarRef.current) {
            const verticalBar = scrollbarRef.current.querySelector<HTMLDivElement>(
                `.${styles.verticalBarContainer}`,
            );

            if (verticalBar) {
                const headerHeight = headerElementRef?.current?.offsetHeight || 0;
                const footerHeight = footerElementRef?.current?.offsetHeight || 0;

                let topGap;
                let topOffset;
                let bottomGap;

                if (headerHeight) {
                    // если есть header уменьшаем размер скролла на величину хедера и добавляем отступ сверху
                    topGap = headerHeight;
                    topOffset = headerHeight;
                    // console.warn(headerHeight);
                } else {
                    // иначе уменьшаем размер скролла и увеличиваем отступ на величину скругления
                    topGap = SCROLLBAR_DEFAULT_GAP;
                    topOffset = SCROLLBAR_DEFAULT_GAP;
                }

                if (footerHeight) {
                    // если есть footer уменьшаем размер скролла на величину футера
                    bottomGap = footerHeight;
                } else {
                    // иначе уменьшаем размер на величину скругления
                    bottomGap = SCROLLBAR_DEFAULT_GAP;
                }

                verticalBar.style.height = `calc(100% - ${topGap}px - ${bottomGap}px)`;
                verticalBar.style.top = `${topOffset}px`;
            }
        }
    });

    return (
        <Scrollbar
            className={styles.scrollbarWrapper}
            verticalBarClassName={styles.verticalBarContainer}
            scrollableNodeProps={{ ref: scrollableNodeRef, className: styles.scrollContentWrapper }}
            onContentScroll={handleScroll}
            contentNodeProps={{
                ref: scrollbarContentNodeRef,
                className: styles.scrollbarContainer,
            }}
            ref={scrollbarRef}
        >
            <ModalCustomHeader preset={preset} onClose={onClose} />
            {children}
            <ModalCustomFooter preset={footerPreset} />
        </Scrollbar>
    );
};

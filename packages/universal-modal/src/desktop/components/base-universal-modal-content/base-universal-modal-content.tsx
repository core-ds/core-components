import React, { FC, useContext, useEffect, useRef } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { ResponsiveContext } from '../../../ResponsiveContext';
import { SCROLLBAR_DEFAULT_GAP } from '../../constants/types';

import styles from './base-universal-modal-content.module.css';

type BaseUniversalModalContentProps = {
    wheelDeltaY: number;
} & Pick<BaseModalProps, 'children'>;

/**
 * Для Universal Modal используется 2 сущности Drawer и Base Modal.
 * Этот компонент содержит общий код передаваемый в эти сущности.
 */
export const BaseUniversalModalContent: FC<BaseUniversalModalContentProps> = (props) => {
    const { children, wheelDeltaY } = props;
    const { setModalHeaderHighlighted, setModalFooterHighlighted } =
        useContext(ResponsiveContext) || {};

    const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
    const scrollbarContentNodeRef = useRef<HTMLDivElement | null>(null);
    const scrollbarRef = useRef<HTMLDivElement | null>(null);
    const headerElementRef = useRef<HTMLDivElement | null>(null);
    const footerElementRef = useRef<HTMLDivElement | null>(null);

    // расчет overlap состояния
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

    // очищаем overlap значения в контексте
    useEffect(
        () => () => {
            if (setModalHeaderHighlighted) {
                setModalHeaderHighlighted(false);
            }

            if (setModalFooterHighlighted) {
                setModalFooterHighlighted(false);
            }
        },
        [setModalHeaderHighlighted, setModalFooterHighlighted],
    );

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

    // расчет overlap футера при resize событии
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            const contentHeight = scrollbarContentNodeRef.current?.clientHeight || 0;
            const wrapperHeight = scrollableNodeRef.current?.clientHeight || 0;

            if (setModalFooterHighlighted && contentHeight > wrapperHeight) {
                setModalFooterHighlighted(true);
            }
        });

        if (scrollbarContentNodeRef.current) {
            resizeObserver.observe(scrollbarContentNodeRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [setModalFooterHighlighted]);

    return (
        <Scrollbar
            className={styles.scrollbarWrapper}
            verticalBarClassName={styles.verticalBarContainer}
            ref={scrollbarRef}
            scrollableNodeProps={{
                ref: scrollableNodeRef,
                className: styles.scrollContentWrapper,
            }}
            contentNodeProps={{
                ref: scrollbarContentNodeRef,
                className: styles.scrollbarContainer,
            }}
            onContentScroll={handleScroll}
        >
            {children}
        </Scrollbar>
    );
};

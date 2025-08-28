import { RefObject, useContext, useEffect } from 'react';

import { ScrollbarProps } from '@alfalab/core-components-scrollbar';

import { UniversalModalContext } from '../../context/universal-modal-context';

interface Params {
    scrollbarContentNodeRef: RefObject<HTMLDivElement>;
    scrollableNodeRef: RefObject<HTMLDivElement>;
}

/**
 * Расчет overlap состояния
 * Этот функционал есть в base-modal, но так как в desktop версии используется кастомный scroll необходимо обрабатывать это в ручную
 */
export const useModalHighlighted = (params: Params) => {
    const { scrollbarContentNodeRef, scrollableNodeRef } = params;

    const { setModalHeaderHighlighted, setModalFooterHighlighted } =
        useContext(UniversalModalContext);

    const handleScroll: ScrollbarProps['onContentScroll'] = (e) => {
        const target = e.target as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = target;

        const isElementFullScrolled = scrollHeight - scrollTop === clientHeight;

        if (setModalHeaderHighlighted) {
            setModalHeaderHighlighted(scrollTop > 0);
        }

        if (setModalFooterHighlighted) {
            setModalFooterHighlighted(!isElementFullScrolled);
        }
    };

    // Очищаем overlap значения в контексте
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

    // Расчет overlap футера при resize событии
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            const contentHeight = scrollbarContentNodeRef.current?.clientHeight || 0;
            const wrapperHeight = scrollableNodeRef.current?.clientHeight || 0;

            if (setModalFooterHighlighted) {
                setModalFooterHighlighted(contentHeight > wrapperHeight);
            }
        });

        if (scrollbarContentNodeRef.current) {
            resizeObserver.observe(scrollbarContentNodeRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setModalFooterHighlighted]);

    return { handleScroll };
};

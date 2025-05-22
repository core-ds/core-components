import React, { FC, useRef } from 'react';
import cn from 'classnames';

import { BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { useModalHighlighted } from '../../hooks/use-modal-highlighted';
import { useOutsideScroll } from '../../hooks/use-outside-scroll';
import { useSetScrollbarHeight } from '../../hooks/use-set-scrollbar-height';
import { UniversalModalDesktopProps } from '../../types/props';
import { setFooterAndHeaderRefs } from '../../utils/set-footer-and-header-refs';

import styles from './modal-content.module.css';

type Props = {
    height: UniversalModalDesktopProps['height'];
    wheelDeltaY: number;
} & Pick<BaseModalProps, 'children'>;

export const ModalContent: FC<Props> = (props) => {
    const { children, wheelDeltaY, height } = props;

    const scrollableNodeRef = useRef<HTMLDivElement>(null);
    const scrollbarContentNodeRef = useRef<HTMLDivElement>(null);
    const scrollbarRef = useRef<HTMLDivElement | null>(null);
    const verticalBarRef = useRef<HTMLDivElement>(null);
    const headerElementRef = useRef<HTMLDivElement>(null);
    const footerElementRef = useRef<HTMLDivElement | null>(null);

    const { handleScroll } = useModalHighlighted({ scrollbarContentNodeRef, scrollableNodeRef });

    useOutsideScroll({ scrollableNodeRef, wheelDeltaY });

    const { enhancedChildren } = setFooterAndHeaderRefs({
        children,
        headerElementRef,
        footerElementRef,
    });

    useSetScrollbarHeight({ scrollbarRef, verticalBarRef, headerElementRef, footerElementRef });

    return (
        <Scrollbar
            className={styles.scrollable}
            ref={scrollbarRef}
            verticalBarRef={verticalBarRef}
            scrollableNodeProps={{
                ref: scrollableNodeRef,
                className: styles.scrollableNode,
            }}
            contentNodeProps={{
                ref: scrollbarContentNodeRef,
                className: cn(styles.contentNode, {
                    [styles.hugContent]: height === 'hugContent',
                }),
            }}
            onContentScroll={handleScroll}
        >
            {enhancedChildren}
        </Scrollbar>
    );
};

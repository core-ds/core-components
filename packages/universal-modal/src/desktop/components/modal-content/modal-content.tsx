import React, { type FC, useRef } from 'react';
import cn from 'classnames';

import { type BaseModalProps } from '@alfalab/core-components-base-modal';
import { Scrollbar } from '@alfalab/core-components-scrollbar';

import { useSetScrollbarHeight } from '../../hooks/use-set-scrollbar-height';
import { type UniversalModalDesktopProps } from '../../types/props';
import { setFooterAndHeaderRefs } from '../../utils/set-footer-and-header-refs';

import styles from './modal-content.module.css';

type PickedBaseModalProps = Pick<BaseModalProps, 'children'>;
type PickedUniversalModalDesktopProps = Pick<
    UniversalModalDesktopProps,
    'height' | 'scrollableContainerRef'
>;

type Props = PickedBaseModalProps & PickedUniversalModalDesktopProps;

export const ModalContent: FC<Props> = (props) => {
    const { children, height, scrollableContainerRef = null } = props;

    const scrollbarRef = useRef<HTMLDivElement | null>(null);
    const verticalBarRef = useRef<HTMLDivElement>(null);
    const headerElementRef = useRef<HTMLDivElement>(null);
    const footerElementRef = useRef<HTMLDivElement | null>(null);

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
                ref: scrollableContainerRef,
                className: styles.scrollableNode,
            }}
            contentNodeProps={{
                className: cn(styles.contentNode, {
                    [styles.hugContent]: height === 'hugContent',
                }),
            }}
        >
            {enhancedChildren}
        </Scrollbar>
    );
};

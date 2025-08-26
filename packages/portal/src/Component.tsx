import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { usePortalContainer } from './hooks/usePortalContainer';

export interface PortalProps {
    /**
     *  Контент
     */
    children?: ReactNode;

    /**
     * Функция, возвращающая контейнер, в который будут рендериться дочерние элементы
     */
    getPortalContainer?: () => Element | null | undefined;

    /**
     * Немедленно отрендерить дочерние элементы (false - контент будет отрендерен на след. рендер).
     */
    immediateMount?: boolean;
}

export const Portal = forwardRef<Element | null | undefined, PortalProps>((props, ref) => {
    const portalContainer = usePortalContainer();
    const { getPortalContainer = portalContainer, immediateMount = false, children } = props;
    const [mountNode, setMountNode] = useState<Element | null | undefined>(
        immediateMount ? getPortalContainer : null,
    );

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const nextMountNode = getPortalContainer();

        if (mountNode !== nextMountNode) {
            setMountNode(nextMountNode);
        }
    });

    useImperativeHandle<Element | null | undefined, Element | null | undefined>(
        ref,
        () => mountNode,
        [mountNode],
    );

    return mountNode ? createPortal(children, mountNode) : null;
});

Portal.displayName = 'Portal';

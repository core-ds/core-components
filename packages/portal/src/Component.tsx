import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { usePortalContainer } from './hooks/usePortalContainer';
import { setRef } from './utils';

export type PortalProps = {
    /** Контент */
    children?: ReactNode;

    /**
     * Функция, возвращающая контейнер, в который будут рендериться дочерние элементы
     */
    getPortalContainer?: () => Element | null;

    /**
     * Немедленно отрендерить дочерние элементы (false - контент будет отрендерен на след. рендер).
     */
    immediateMount?: boolean;
};
export const Portal = forwardRef<Element, PortalProps>((props, ref) => {
    const portalContainer = usePortalContainer();

    const { getPortalContainer = portalContainer, immediateMount = false, children } = props;

    const [mountNode, setMountNode] = useState<Element | null>(() =>
        typeof window !== 'undefined' && immediateMount ? getPortalContainer() : null,
    );

    useEffect(() => {
        setMountNode(getPortalContainer());
    }, [getPortalContainer]);

    useEffect(() => {
        if (mountNode) {
            setRef(ref, mountNode);

            return () => {
                setRef(ref, null);
            };
        }

        return () => null;
    }, [ref, mountNode]);

    return mountNode ? createPortal(children, mountNode) : mountNode;
});

Portal.displayName = 'Portal';

import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useComponentOverrides } from '@alfalab/core-components-provider';

import { getDefaultPortalContainer, setRef } from './utils';

export type PortalProps = {
    /** Контент */
    children?: ReactNode;

    /**
     * Функция, возвращающая контейнер, в который будут рендериться дочерние элементы
     */
    getPortalContainer?: () => Element;

    /**
     * Немедленно отрендерить дочерние элементы (false - контент будет отрендерен на след. рендер).
     */
    immediateMount?: boolean;
};
export const Portal = forwardRef<Element, PortalProps>(
    ({ getPortalContainer = getDefaultPortalContainer, immediateMount = false, children }, ref) => {
        const overrides = useComponentOverrides('Portal');

        const [mountNode, setMountNode] = useState<Element | null>(() =>
            typeof window !== 'undefined' && immediateMount
                ? (overrides?.getContainer && overrides.getContainer()) || getPortalContainer()
                : null,
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
    },
);

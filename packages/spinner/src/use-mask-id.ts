import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const useMaskId = () => {
    const maskRef = useRef<SVGMaskElement>(null);
    const [maskId, setMaskId] = useState(() => uuid());

    useEffect(() => {
        // Hydration сохраняет серверные атрибуты. Принимаем этот id перед следующими обновлениями.
        const renderedMaskId = maskRef.current?.id;

        if (!renderedMaskId || renderedMaskId === maskId) {
            return;
        }

        setMaskId(renderedMaskId);
    }, [maskId]);

    return { maskId, maskRef };
};

import { useEffect, useState } from 'react';

const isDocumentVisible = () => typeof document === 'undefined' || !document.hidden;

/** Возвращает видимость вкладки и обновляет её по visibilitychange. */
export const useDocumentVisible = () => {
    const [documentVisible, setDocumentVisible] = useState(isDocumentVisible);

    useEffect(() => {
        const handleVisibilityChange = () => setDocumentVisible(isDocumentVisible());

        handleVisibilityChange();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return documentVisible;
};

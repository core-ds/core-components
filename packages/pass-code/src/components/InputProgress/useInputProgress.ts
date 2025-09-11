import { useCallback, useState } from 'react';

export const useInputProgress = (success?: boolean) => {
    const [rawSuccess, setRawSuccess] = useState<boolean>(false);

    // костыль для корректной работы анимации исчезновения точек
    const resetSuccessAnimation = useCallback(() => {
        // компонент использует CSSTransition и нативную анимацию это приводит к конфликтам transition и animation
        if (success) {
            setRawSuccess(true);
            setTimeout(() => {
                setRawSuccess(false);
            }, 1000);
        }
    }, [success]);

    return { rawSuccess, resetSuccessAnimation };
};

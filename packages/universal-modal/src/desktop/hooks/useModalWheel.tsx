import { useState, WheelEvent } from 'react';

export const useModalWheel = (overlay: boolean) => {
    const [wheelDeltaY, setWheelDeltaY] = useState<number>(0);

    // передаем e.deltaY от события на элементе dialog компонента base-modal
    const handleWheel = (e: WheelEvent<HTMLElement>) => {
        const target = e.target as HTMLDivElement;

        if (target.getAttribute('role') === 'dialog' && overlay) {
            setWheelDeltaY(e.deltaY);
        }
    };

    return { wheelDeltaY, handleWheel };
};

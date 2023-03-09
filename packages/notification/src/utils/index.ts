import React from 'react';

/*
 * Дублирую хук из @alfalab/hooks, так как не подходят названия событий
 * https://github.com/core-ds/utils/blob/develop/packages/hooks/src/useClickOutside/hook.ts
 * issue завел, когда изменения будут реализованы, отсюда можно будет удалить
 * https://github.com/core-ds/utils/issues/35
 */
export function useClickOutside(
    ref: React.RefObject<HTMLElement>,
    cb: (e: React.MouseEvent | React.TouchEvent) => void,
): void {
    React.useEffect(() => {
        // eslint-disable-next-line
        const handler = (event: any) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            cb(event);
        };

        document.addEventListener('click', handler);
        document.addEventListener('touchend', handler);

        return () => {
            document.removeEventListener('click', handler);
            document.removeEventListener('touchend', handler);
        };
    }, [ref, cb]);
}

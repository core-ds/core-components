import { useMatchMedia } from '@alfalab/core-components-mq';
import { isClient } from '@alfalab/core-components-shared';

import { type OptionsListProps } from '../typings';

type Params = Pick<OptionsListProps, 'nativeScrollbar' | 'client'>;

export const useNativeScrollbar = (params: Params) => {
    const { nativeScrollbar: scrollbarByProp, client } = params;

    const query = '(max-width: 1023px)';

    const [nativeScrollbar] = useMatchMedia(query, () =>
        isClient() ? window.matchMedia(query).matches : true,
    );

    /**
     * Условия отображения custom/native scrollbar
     * 1. Принудительное управление через пропс
     * 2. Для desktop/mobile выключаем и включаем соответственно
     * 3. Иначе ориентируемся на медиа-запрос
     */
    if (scrollbarByProp) {
        return scrollbarByProp;
    }

    if (client === 'desktop') {
        return false;
    }

    if (client === 'mobile') {
        return true;
    }

    return nativeScrollbar;
};

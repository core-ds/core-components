import { type RefObject, useCallback, useMemo } from 'react';

import { getFocusRestrictionMeta, resolveRestrictedIndex } from './utils';

interface UseFocusRestrictionPayload {
    /** Флаг. который активирует ограничение фокуса */
    restrictFocus: boolean;
    /** Текущее значение инпута */
    values: string[];
    /** Количество полей */
    fields: number;
    /** Ссылки на инпуты */
    inputRefs: Array<RefObject<HTMLInputElement>>;
    /** Колбэк для установки фокуса */
    focusOnInput: (inputRef: RefObject<HTMLInputElement>) => void;
}

interface UseFocusRestriction {
    focusRestrictedInput: (
        /** Индекс, на который требуется перейти */
        requestedIndex: number,
        /** Опции для управления поведением переключения фокуса */
        options?: FocusRestrictedInputOptions,
    ) => boolean;
}

type FocusRestrictedInputOptions = {
    /** Не переключать фокус, если запрашиваемый индекс уже является допустимым */
    skipEqual?: boolean;
};

/**
 * Управляет ограничением фокуса в наборе инпутов кода и предоставляет API
 * для безопасного переключения на допустимый индекс.
 */
export const useFocusRestriction = ({
    restrictFocus,
    values,
    fields,
    inputRefs,
    focusOnInput,
}: UseFocusRestrictionPayload): UseFocusRestriction => {
    const inputRefsLength = inputRefs.length;

    const restrictionMeta = useMemo(() => {
        if (!restrictFocus || inputRefsLength === 0) {
            return null;
        }

        return getFocusRestrictionMeta({ values, fields });
    }, [restrictFocus, inputRefsLength, values, fields]);

    /**
     * Переводит фокус на разрешённый инпут, учитывая текущее состояние.
     * @returns true — переключение выполнено или запрещено логикой ограничения; false — хук не вмешался.
     */
    const focusRestrictedInput = useCallback(
        (requestedIndex: number, options?: FocusRestrictedInputOptions) => {
            if (!restrictFocus || restrictionMeta === null) {
                return false;
            }

            const restrictedIdx = resolveRestrictedIndex({
                requestedIndex,
                meta: restrictionMeta,
            });

            if (options?.skipEqual && restrictedIdx === requestedIndex) {
                return false;
            }

            const restrictedRef = inputRefs[restrictedIdx];

            if (!restrictedRef) {
                return false;
            }

            focusOnInput(restrictedRef);

            return true;
        },
        [restrictFocus, restrictionMeta, inputRefs, focusOnInput],
    );

    return { focusRestrictedInput };
};

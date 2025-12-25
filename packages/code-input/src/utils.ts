type NextEmptyIdxPayload = {
    values: string[];
    fields: number;
};

/**
 * Находит индекс следующей пустой ячейки
 * @returns индекс первой пустой ячейки, индекс следующей пустой (если ячейки заполнены частично), или -1 если все ячейки заполнены
 */
const getNextEmptyIdx = ({ values, fields }: NextEmptyIdxPayload): number => {
    for (let idx = 0; idx < fields; idx += 1) {
        const value = values[idx];

        if (!value) {
            return idx;
        }
    }

    return -1;
};

type FocusRestrictionPayload = {
    values: string[];
    fields: number;
};

type FocusRestrictionMeta = {
    /** Индекс ячейки, на которую можно установить фокус */
    focusIdx: number;
    /** Флаг, указывающий что все ячейки заполнены */
    isComplete: boolean;
};

/** Получает метаданные для ограничения фокуса на основе текущих значений */
export const getFocusRestrictionMeta = ({
    values,
    fields,
}: FocusRestrictionPayload): FocusRestrictionMeta => {
    const nextEmptyIdx = getNextEmptyIdx({ values, fields });

    if (nextEmptyIdx === -1) {
        const lastIndex = Math.max(fields - 1, 0);

        return {
            focusIdx: lastIndex,
            isComplete: true,
        };
    }

    return {
        focusIdx: nextEmptyIdx,
        isComplete: false,
    };
};

type ResolveFocusIndexPayload = {
    requestedIndex: number;
    meta: FocusRestrictionMeta;
};

/** Разрешает допустимый индекс для установки фокуса с учетом ограничений */
export const resolveRestrictedIndex = ({
    requestedIndex,
    meta,
}: ResolveFocusIndexPayload): number => {
    const { focusIdx } = meta;
    const normalizedIndex = Math.max(requestedIndex, 0);

    if (normalizedIndex > focusIdx) {
        return focusIdx;
    }

    return normalizedIndex;
};

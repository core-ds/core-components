import React, { forwardRef } from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../consts';
import { TextareaIncomeProps } from '../typings';

import styles from '../index.module.css';

type PseudoTextAreaProps = {
    /**
     * Дополнительный класс компонента
     */
    pseudoTextareaClassName?: string;
    /**
     * Значение PseudoTextArea, разделяется на 2 части по maxLength
     */
    value: string;
    /**
     * Максимальное количество символов, символы свыше maxLength будут выделены
     */
    maxLength: number;
} & Pick<TextareaIncomeProps, 'size'>;

export const PseudoTextArea = forwardRef<HTMLDivElement, PseudoTextAreaProps>(
    ({ size = 48, pseudoTextareaClassName, maxLength, value }, ref) => (
        <div
            className={cn(
                styles.pseudoTextarea,
                styles[SIZE_TO_CLASSNAME_MAP[size]],
                pseudoTextareaClassName,
            )}
            ref={ref}
            hidden={true}
        >
            <span>{value.slice(0, maxLength)}</span>
            <span className={cn(styles.overflow)}>{value.slice(maxLength)}</span>
            {/* Перенос строки нужен для правильной позиции */}
            <br />
        </div>
    ),
);

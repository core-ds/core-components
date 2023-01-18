import React, { forwardRef } from 'react';
import cn from 'classnames';

import styles from '../index.module.css';
import { TextareaIncomeProps } from '../typings';

type PseudoTextAreaProps = {
    /**
     * Дополнительный класс компонента
     */
    pseudoTextareaClassName?: string;
    /**
     * Значение PseudoTextArea, разделяется на 2 части по maxLength
     */
    value: string;
} & Pick<TextareaIncomeProps, 'size' | 'maxLength'>;

export const PseudoTextArea = forwardRef<HTMLDivElement, PseudoTextAreaProps>(
    ({ size = 's', pseudoTextareaClassName, maxLength, value }, ref) => (
        <div
            className={cn(styles.pseudoTextarea, styles[size], pseudoTextareaClassName)}
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

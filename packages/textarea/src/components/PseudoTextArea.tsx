import React, { forwardRef } from 'react';
import cn from 'classnames';

import styles from '../index.module.css';
import { TextareaIncomeProps } from '../typings';

type PseudoTextAreaProps = {
    pseudoTextareaClassName: string;
    stateValue: string;
} & TextareaIncomeProps;

export const PseudoTextArea = forwardRef<HTMLDivElement, PseudoTextAreaProps>(
    ({ size = 's', pseudoTextareaClassName = '', maxLength, stateValue }, ref) => (
        <div
            className={cn(styles.pseudoTextarea, styles[size], pseudoTextareaClassName)}
            ref={ref}
            hidden={true}
        >
            <span>{stateValue.slice(0, maxLength)}</span>
            <span className={cn(styles.overflow)}>{stateValue.slice(maxLength)}</span>
            {/* Перенос строки нужен для правильной позиции */}
            <br />
        </div>
    ),
);

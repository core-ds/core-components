import React from 'react';
import cn from 'classnames';

import { Checkbox, type CheckboxProps } from '@alfalab/core-components-checkbox';

import { type OptionsListProps } from '../../../../typings';

import styles from './index.module.css';

export type HeaderProps = {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: CheckboxProps['onChange'];
    mobile?: boolean;
    dataTestId?: string;
    checkmarkPosition?: 'before' | 'after';
    size?: OptionsListProps['size'];
};

export const Header: React.FC<HeaderProps> = ({
    onChange,
    checked,
    indeterminate,
    mobile,
    dataTestId,
    size,
    checkmarkPosition = 'before',
}) => (
    <div
        className={cn(size && styles[`size-${size}`], {
            [styles.desktop]: !mobile,
            [styles.mobile]: mobile,
        })}
    >
        <Checkbox
            className={cn({
                [styles.checkmarkBeforeContent]: checkmarkPosition === 'before',
                [styles.checkmarkAfterContent]: checkmarkPosition === 'after',
            })}
            contentClassName={cn({
                [styles.content]: checkmarkPosition === 'after',
            })}
            block={true}
            indeterminate={indeterminate}
            size={24}
            onChange={onChange}
            checked={checked}
            label='Выбрать все'
            dataTestId={dataTestId}
        />
    </div>
);

import React from 'react';
import cn from 'classnames';

import { Checkbox, CheckboxProps } from '@alfalab/core-components-checkbox';

import { SIZE_TO_CLASSNAME_MAP } from '../../../../consts';
import { OptionsListProps } from '../../../../typings';

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
        className={cn(size && styles[SIZE_TO_CLASSNAME_MAP[size]], {
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
            size='m'
            onChange={onChange}
            checked={checked}
            label='Выбрать все'
            dataTestId={dataTestId}
        />
    </div>
);

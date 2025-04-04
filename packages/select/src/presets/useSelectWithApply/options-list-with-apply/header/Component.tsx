import React from 'react';
import { Checkbox, CheckboxProps } from '@balafla/core-components-checkbox';
import cn from 'classnames';

import styles from './index.module.css';

export type HeaderProps = {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: CheckboxProps['onChange'];
    mobile?: boolean;
    dataTestId?: string;
};

export const Header: React.FC<HeaderProps> = ({
    onChange,
    checked,
    indeterminate,
    mobile,
    dataTestId,
}) => (
    <div className={cn({ [styles.desktop]: !mobile, [styles.mobile]: mobile })}>
        <Checkbox
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

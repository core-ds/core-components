import React from 'react';
import cn from 'classnames';

import { Checkbox, CheckboxProps } from '@alfalab/core-components-checkbox';

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

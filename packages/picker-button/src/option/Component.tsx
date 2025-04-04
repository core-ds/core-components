import React, { FC, SVGProps } from 'react';
import {
    Option as BaseOption,
    OptionProps as BaseOptionProps,
    OptionShape,
} from '@balafla/core-components-select/shared';

import styles from './index.module.css';

type OptionProps = Omit<BaseOptionProps, 'option'> & {
    option: OptionShape & {
        icon?: FC<SVGProps<SVGSVGElement>>;
    };
};

export const Option = ({ option, children, ...restProps }: OptionProps) => {
    const content = children || option.content || option.key;

    const Icon = option.icon;

    return (
        <BaseOption option={option} {...restProps}>
            <div className={styles.container}>
                {Icon && <Icon className={styles.icon} />}
                <div className={styles.content}>{content}</div>
            </div>
        </BaseOption>
    );
};

import React, { FC } from 'react';

import { Title, TitleProps } from '../title/component';

import commonStyles from '../title/common.module.css';
import styles from './index.module.css';

export const TitleResponsive: FC<TitleProps> = (props) => (
    /**
     * Если поменять Object.assign на деструктуризацию, то упадут тесты.
     * Видимо, это особенность работы jest и css-modules.
     */
    <Title {...props} styles={Object.assign(commonStyles, styles)} />
);

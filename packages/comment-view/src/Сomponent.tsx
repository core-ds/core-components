import React from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import styles from './index.module.css';

export type CommentViewProps = {
    /** Сss класс для стилизации общей обёртки */
    className?: string;
    
    /** Id компонента для тестов */
    dataTestId?: string;
};

export const CommentView: React.FC<CommentViewProps> = ({ className, dataTestId, children }) => (
    <div className={cn(styles.component, className)} data-test-id={dataTestId}>
        <Typography.Text tag='div' view='component' className={styles.text} color='primary'>
            {children}
        </Typography.Text>
    </div>
);

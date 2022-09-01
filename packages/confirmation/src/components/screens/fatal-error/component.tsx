import React, { useContext, Fragment, FC } from 'react';
import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';

import { ConfirmationContext } from '../../../context';

import styles from './index.module.css';

export type FatalErrorProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const FatalError: FC<FatalErrorProps> = ({ mobile }) => {
    const { texts, onFatalErrorOkButtonClick } = useContext(ConfirmationContext);

    return (
        <Fragment>
            <Typography.Title
                tag='h3'
                font='system'
                view={mobile ? 'xsmall' : 'small'}
                color='primary'
                className={styles.header}
            >
                {texts.fatalErrorTitle}
            </Typography.Title>

            <Typography.Text view='primary-medium' color='primary' className={styles.description}>
                {texts.fatalErrorDescription}
            </Typography.Text>

            <Button size={mobile ? 'xs' : 's'} view='secondary' onClick={onFatalErrorOkButtonClick}>
                {texts.fatalErrorButton}
            </Button>
        </Fragment>
    );
};

import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';

import { ConfirmationContext } from '../../../context';
import { Header } from '../../header';

import styles from './index.module.css';

export type FatalErrorProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const FatalError: FC<FatalErrorProps> = ({ mobile }) => {
    const { alignContent, texts, onFatalErrorOkButtonClick } = useContext(ConfirmationContext);

    return (
        <div className={cn(styles.component, styles[alignContent])}>
            <Header mobile={mobile}>{texts.fatalErrorTitle}</Header>

            <Typography.Text
                view='primary-medium'
                color='primary'
                className={cn({ [styles.typographyTheme]: !mobile })}
            >
                {texts.fatalErrorDescription}
            </Typography.Text>

            <Button
                size={mobile ? 'xs' : 's'}
                view='secondary'
                onClick={onFatalErrorOkButtonClick}
                className={styles.button}
            >
                {texts.fatalErrorButton}
            </Button>
        </div>
    );
};

import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { TypographyText } from '@alfalab/core-components-typography';

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
    const { alignContent, texts, onFatalErrorOkButtonClick, breakpoint, client } =
        useContext(ConfirmationContext);

    return (
        <div className={cn(styles.component, styles[alignContent])}>
            <Header mobile={mobile}>{texts.fatalErrorTitle}</Header>

            <TypographyText
                view='primary-medium'
                color='primary'
                className={cn({
                    [styles.typographyTheme]: !mobile,
                    [styles.typographyThemeMobile]: mobile,
                })}
            >
                {texts.fatalErrorDescription}
            </TypographyText>

            <Button
                size={mobile ? 40 : 48}
                view='secondary'
                onClick={onFatalErrorOkButtonClick}
                className={styles.button}
                breakpoint={breakpoint}
                client={client}
            >
                {texts.fatalErrorButton}
            </Button>
        </div>
    );
};

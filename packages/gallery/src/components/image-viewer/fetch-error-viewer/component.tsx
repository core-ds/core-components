import React, { type FC, type MouseEventHandler } from 'react';

import { Button } from '@alfalab/core-components-button';
import { SystemMessage } from '@alfalab/core-components-system-message';
import { NoImageMIcon } from '@alfalab/icons-glyph/NoImageMIcon';

import styles from './index.module.css';

type Props = {
    onRetry: () => void;
};

export const FetchErrorViewer: FC<Props> = ({ onRetry }) => {
    const handleRetry: MouseEventHandler = (event) => {
        event.stopPropagation();
        onRetry();
    };
    const title = 'Не получилось загрузить';
    const subtitle = 'Уже знаем, в чём дело, и чиним. \nПопробуйте зайти позже';

    return (
        <div className={styles.component} role='alert'>
            <SystemMessage padding={0}>
                <SystemMessage.Graphic>
                    <NoImageMIcon className={styles.icon} aria-hidden={true} />
                </SystemMessage.Graphic>

                <SystemMessage.Title className={styles.text} tag='h2' padding={{ bottom: 24 }}>
                    {title}
                </SystemMessage.Title>

                <SystemMessage.Subtitle className={styles.text} padding={0}>
                    {subtitle}
                </SystemMessage.Subtitle>

                <SystemMessage.Controls padding={{ top: 40 }}>
                    <Button
                        className={styles.retryButton}
                        view='secondary'
                        colors='inverted'
                        size={48}
                        onClick={handleRetry}
                    >
                        Попробовать ещё раз
                    </Button>
                </SystemMessage.Controls>
            </SystemMessage>
        </div>
    );
};

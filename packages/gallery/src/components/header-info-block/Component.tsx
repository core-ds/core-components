import React, { type FC } from 'react';

import { Text, TitleDesktop } from '@alfalab/core-components-typography';

import { splitFilename } from '../../utils';

import styles from './index.module.css';

export type HeaderInfoBlockProps = {
    filename: string;
    description?: string;
};

export const HeaderInfoBlock: FC<HeaderInfoBlockProps> = ({ filename, description }) => {
    const [head, tail] = splitFilename(filename);

    return (
        <div className={styles.info}>
            <div className={styles.filenameContainer}>
                <TitleDesktop
                    tag='h1'
                    className={styles.filenameHead}
                    view='xsmall'
                    font='system'
                    color='static-primary-light'
                >
                    {head}
                </TitleDesktop>

                <TitleDesktop tag='h1' view='xsmall' font='system' color='static-primary-light'>
                    {tail}
                </TitleDesktop>
            </div>

            {description ? (
                <Text
                    className={styles.description}
                    tag='div'
                    view='primary-medium'
                    color='static-secondary-light'
                >
                    {description}
                </Text>
            ) : null}
        </div>
    );
};

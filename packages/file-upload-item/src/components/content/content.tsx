import React, { useContext } from 'react';
import cn from 'classnames';

import { TypographyText } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../context/file-upload-item-context';

import { ContentSubtitle } from './components/content-subtitle/content-subtitle';

import styles from './content.module.css';

export const Content = () => {
    const {
        title,
        customContent: CustomContent,
        truncate,
        subtitle,
        showRestore,
        actionsPresent,
        isClickable,
    } = useContext(FileUploadItemContext);

    if (CustomContent) {
        return <CustomContent />;
    }

    return (
        <div
            className={cn(styles.container, {
                [styles.single]: !subtitle,
                [styles.clickable]: !actionsPresent && isClickable,
            })}
        >
            {title && (
                <TypographyText
                    className={cn(styles.title, {
                        [styles.truncate]: truncate,
                        [styles.restore]: showRestore,
                    })}
                    view='component'
                    color='primary'
                >
                    {title}
                </TypographyText>
            )}
            <ContentSubtitle />
        </div>
    );
};

import React, { useContext } from 'react';
import { Text } from '@balafla/core-components-typography';
import cn from 'classnames';

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
    } = useContext(FileUploadItemContext);

    if (CustomContent) {
        return <CustomContent />;
    }

    return (
        <div
            className={cn(styles.container, {
                [styles.single]: !subtitle,
            })}
        >
            {title && (
                <Text
                    className={cn(styles.title, {
                        [styles.truncate]: truncate,
                        [styles.restore]: showRestore,
                    })}
                    view='component'
                    color='primary'
                >
                    {title}
                </Text>
            )}
            <ContentSubtitle />
        </div>
    );
};

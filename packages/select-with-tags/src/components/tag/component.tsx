import React, { useCallback } from 'react';
import cn from 'classnames';

import { TagDesktop as CoreTag } from '@alfalab/core-components-tag/desktop';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

import { type TagComponent } from '../../types';

import styles from './index.module.css';

export const Tag: TagComponent = ({
    option: { content, key },
    onClick,
    handleDeleteTag,
    checked,
    disabled,
    ...props
}) => {
    const handleClick = useCallback(() => {
        if (handleDeleteTag) {
            handleDeleteTag(key);
        }
    }, [handleDeleteTag, key]);

    return (
        <CoreTag
            key={key}
            size={32}
            shape='rectangular'
            onClick={onClick}
            checked={checked}
            className={cn(styles.tag, { [styles.tagNoClose]: !handleDeleteTag })}
            disabled={disabled}
            {...props}
        >
            <span className={cn(styles.tagContentWrap, { [styles.cursorPointer]: !disabled })}>
                {content}
                {handleDeleteTag && (
                    // eslint-disable-next-line
                    <span className={styles.tagCross} onClick={handleClick}>
                        <CrossCircleMIcon width={16} height={16} />
                    </span>
                )}
            </span>
        </CoreTag>
    );
};

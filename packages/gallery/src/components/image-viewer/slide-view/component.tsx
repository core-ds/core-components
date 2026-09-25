import React, { type FC, type ReactNode } from 'react';
import cn from 'classnames';

import { Spinner } from '@alfalab/core-components-spinner';

import { FetchErrorViewer } from '../fetch-error-viewer/component';

import styles from '../index.module.css';

type Props = {
    loading: boolean;
    broken: boolean;
    isVideoView: boolean;
    imageContent: ReactNode;
    videoContent: ReactNode;
};

export const SlideView: FC<Props> = ({
    loading,
    broken,
    isVideoView,
    imageContent,
    videoContent,
}) => {
    const media = isVideoView ? videoContent : imageContent;
    const content = broken ? <FetchErrorViewer /> : media;

    return (
        <div className={cn(styles.slide, { [styles.slideLoading]: loading && !isVideoView })}>
            {content}
            <Spinner className={styles.spinner} preset={48} visible={loading} />
        </div>
    );
};

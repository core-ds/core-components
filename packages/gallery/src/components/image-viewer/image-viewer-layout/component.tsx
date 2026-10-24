import React, { type FC, type ReactNode } from 'react';

import { Spinner } from '@alfalab/core-components-spinner';

import { FetchErrorViewer } from '../fetch-error-viewer/component';

import styles from '../index.module.css';

type Props = {
    loading: boolean;
    error: boolean;
    onRetry: () => void;
    children: ReactNode;
};

export const ImageViewerLayout: FC<Props> = ({ loading, error, onRetry, children }) => {
    if (loading) {
        return (
            <Spinner
                className={styles.paginationSpinner}
                preset={48}
                colors='inverted'
                visible={true}
            />
        );
    }

    if (error) {
        return <FetchErrorViewer onRetry={onRetry} />;
    }

    return children;
};

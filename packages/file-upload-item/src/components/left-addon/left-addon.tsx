import React from 'react';
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
// import { FileUploadItemContext } from '../../context/file-upload-item-context';

export const LeftAddon = () => {
    // const context = useContext(FileUploadItemContext);

    return (
        <div>
            <SuperEllipse
                size={48}
                backgroundColor={'var(--color-light-neutral-translucent-100)'}
            />
        </div>
    );
};

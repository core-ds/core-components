import { useContext } from 'react';

import { progressBarDistance } from '../../../../../const/progress-bar';
import { FileUploadItemContext } from '../../../../../context/file-upload-item-context';
import { isErrorStatus, isSuccessStatus, isUploadedStatus } from '../../../../../utils';
import { isError } from '../../../utils/isError';

export const useContentSubtitle = () => {
    const { showRestore, uploadStatus, error, progressBar } = useContext(FileUploadItemContext);

    const shouldShownError = isErrorStatus(uploadStatus) || isError(error);
    const showMeta =
        !showRestore && (isSuccessStatus(uploadStatus) || isUploadedStatus(uploadStatus));

    const progressBarAvailablePercents = 100;

    const validateProgressBarValue = (progressValue?: number) => {
        if (progressValue === undefined) {
            return 0;
        }

        if (progressValue > progressBarDistance) {
            return progressBarDistance;
        }
        if (progressValue < 0) {
            return 0;
        }

        return progressValue;
    };

    const validProgressBar = validateProgressBarValue(progressBar);

    return {
        shouldShownError,
        showMeta,
        progressBarDistance,
        progressBarAvailablePercents,
        validProgressBar,
    };
};

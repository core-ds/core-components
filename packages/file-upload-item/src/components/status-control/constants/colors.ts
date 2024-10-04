import { FileStatuses } from '../../../types';

export const colors: Record<FileStatuses, string> = {
    INITIAL: 'transparent',
    UPLOADED: 'transparent',
    DELETED: 'transparent',
    UPLOADING: '#BABBC2',
    SUCCESS: '#0CC44D',
    ERROR: '#FF4837',
};

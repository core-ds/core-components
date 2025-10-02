import { type FileUploadItemStatus } from './types/status';

export const getExtension = (filename: string) => filename.toLowerCase().split('.').pop();

export const isInitialStatus = (status?: FileUploadItemStatus) => status === 'INITIAL';
export const isSuccessStatus = (status?: FileUploadItemStatus) => status === 'SUCCESS';
export const isErrorStatus = (status?: FileUploadItemStatus) => status === 'ERROR';
export const isUploadingStatus = (status?: FileUploadItemStatus) => status === 'UPLOADING';
export const isUploadedStatus = (status?: FileUploadItemStatus) => status === 'UPLOADED';
export const isLoadingStatus = (status?: FileUploadItemStatus) => status === 'LOADING';

import { FileTypeMap } from '../components/const/file-type-map';

export type FileStatuses = 'ERROR' | 'SUCCESS' | 'LOADING' | 'UPLOADING' | 'INITIAL';
export type FileTypes = keyof typeof FileTypeMap;

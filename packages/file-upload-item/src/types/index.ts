import { FileTypeMap } from '../components/const/file-type-map';
import { UploadStatusMap } from '../components/const/upload-status-map';

export type FileStatuses = keyof typeof UploadStatusMap;
export type FileTypes = keyof typeof FileTypeMap;

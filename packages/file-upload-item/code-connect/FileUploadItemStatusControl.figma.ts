// url=https://www.figma.com/design/QJ8ZKwY1eyR1uuUI3hH3MZ/Web-Core?node-id=3073-1474
// source=packages/file-upload-item/src/Component.tsx
// component=FileUploadItem.StatusControl
import figma from 'figma';
const instance = figma.selectedInstance;
// Свойства конфигурации передаёт родитель FileUploadItem.

export default {
    id: 'core-FileUploadItemStatusControl',
    imports: ["import { FileUploadItem } from '@alfalab/core-components/file-upload-item';"],
    example: figma.code`<FileUploadItem.StatusControl />`,
    metadata: { nestable: true, props: { requiresParent: 'FileUploadItem' } },
};

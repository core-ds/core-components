// url=https://www.figma.com/design/QJ8ZKwY1eyR1uuUI3hH3MZ/Web-Core?node-id=3073-1524
// source=packages/file-upload-item/src/Component.tsx
// component=FileUploadItem.Content
import figma from 'figma';
const instance = figma.selectedInstance;
// Свойства конфигурации передаёт родитель FileUploadItem.

export default {
    id: 'core-FileUploadItemContent',
    imports: ["import { FileUploadItem } from '@alfalab/core-components/file-upload-item';"],
    example: figma.code`<FileUploadItem.Content />`,
    metadata: { nestable: true, props: { requiresParent: 'FileUploadItem' } },
};

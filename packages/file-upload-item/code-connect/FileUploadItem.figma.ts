// url=https://www.figma.com/design/QJ8ZKwY1eyR1uuUI3hH3MZ/Web-Core?node-id=3073-1567
// source=packages/file-upload-item/src/Component.tsx
// component=FileUploadItem
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;
// Живой runtime может вернуть INSTANCE-заглушку даже при hasCodeConnect=true.
function resolvedSections(sections: ResultSection[]): boolean {
    return sections.every((section) => {
        if (section.type === 'ERROR') return false;
        if (section.type === 'INSTANCE')
            return !!section.resultSections && resolvedSections(section.resultSections);
        if (section.type === 'CODE' && section.code.includes('no Code Connect template found'))
            return false;
        return true;
    });
}

function booleanProperty(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') throw new Error(`Не прочитано логическое свойство ${name}`);
    return value;
}
function nested(owner: InstanceHandle, name: string): InstanceHandle {
    const child = owner.findInstance(name);
    if (!child || child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
}
function render(child: InstanceHandle) {
    if (child.hasCodeConnect() !== true)
        throw new Error(`Для вложенного ${child.name} отсутствует Code Connect`);
    const result = child.executeTemplate();
    if (!resolvedSections(result.example))
        throw new Error(`Для вложенного ${child.name} отсутствует готовый код`);
    if (result.metadata?.nestable === false)
        throw new Error('Вложенный компонент требует контекста приложения');
    return result.example;
}
function childCode(owner: InstanceHandle, path?: string[]) {
    const children = owner.findLayers(
        (node) => node.type === 'INSTANCE' && !node.name.startsWith('Placeholder_'),
        path ? { path } : undefined,
    );
    let code = figma.code``;
    for (const child of children)
        if (child.type === 'INSTANCE') {
            if (child.hasCodeConnect() !== true) return undefined;
            const result = child.executeTemplate();
            if (!resolvedSections(result.example)) return undefined;
            if (result.metadata?.nestable === false) return undefined;
            code = figma.code`${code}${result.example}`;
        }
    return children.length ? code : undefined;
}
const left = nested(instance, 'LeftAddon');
const content = nested(instance, 'Content');
const rightEnabled = booleanProperty(instance, 'RightAddon');
const leftPreset = left.getEnum('Preset', {
    SwapMe: 'swap',
    Attach: 'attach',
    CustomIcon: 'custom',
    Img: 'image',
    'PDF or PPT': 'file',
    Word: 'file',
    Excel: 'file',
    '1C': 'file',
    Document: 'file',
    DeletedDocument: 'deleted',
    DeletedImage: 'deleted-image',
    Archive: 'file',
});
const iconStyle = left.getEnum('Style', { None: 'none', Gray: 'gray', Colored: 'colored' });
const preset = content.getEnum('Preset', {
    SwapMe: 'custom',
    Default: 'default',
    Error: 'error',
    NoFile: 'initial',
    Format: 'format',
    Limit: 'limit',
    Uploading: 'uploading',
    'Size & Date': 'meta',
    Deleted: 'deleted',
    'Uploading without progress': 'loading',
    Warning: 'warning',
    Positive: 'positive',
});
if (!leftPreset || !iconStyle || !preset) throw new Error('Неизвестный preset FileUploadItem');
if (preset === 'warning' || preset === 'positive')
    throw new Error(
        'Warning/Positive содержимого не поддерживаются статусами публичного FileUploadItem',
    );
const progressEnabled = booleanProperty(left, 'Progress');
// SwapMe, Attach и удалённые файлы структурно не содержат Progress,
// хотя Figma сохраняет для них Boolean Progress=true.
const supportsProgress = leftPreset === 'file' || leftPreset === 'custom' || leftPreset === 'image';
const progressAvailable = supportsProgress && progressEnabled;
const progress = progressAvailable ? left.findInstance('Progress') : undefined;
const progressState =
    progressAvailable && progress?.type === 'INSTANCE'
        ? progress.getEnum('Preset', {
              Upload: 'UPLOADING',
              Success: 'SUCCESS',
              Error: 'ERROR',
              Spinner: 'LOADING',
          })
        : undefined;
if (progressAvailable && !progressState)
    throw new Error('Неизвестный вид прогресса FileUploadItem');
const status =
    preset === 'error'
        ? 'ERROR'
        : preset === 'deleted'
          ? 'DELETED'
          : preset === 'uploading'
            ? 'UPLOADING'
            : preset === 'loading'
              ? 'LOADING'
              : preset === 'meta'
                ? 'UPLOADED'
                : preset === 'initial' ||
                    preset === 'format' ||
                    preset === 'limit' ||
                    leftPreset === 'attach'
                  ? 'INITIAL'
                  : progressState;
if (preset === 'default' && progressState)
    throw new Error(
        'Прогресс изменяет стандартный subtitle; выберите согласованный preset содержимого',
    );
const title = preset === 'custom' ? undefined : content.getString('✎ Title');
const subtitle =
    preset === 'default' && booleanProperty(content, 'Subtitle')
        ? content.getString('✎ Subtitle')
        : preset === 'format'
          ? content.getString('✎ Format')
          : undefined;
const errors =
    preset === 'error'
        ? [
              content.getString('✎ Error (1)'),
              ...(booleanProperty(content, 'Error (2)') ? [content.getString('✎ Error (2)')] : []),
          ]
        : undefined;
const size =
    preset === 'meta' && booleanProperty(content, 'Size') ? content.getString('✎ Size') : undefined;
const uploadDate =
    preset === 'meta' && booleanProperty(content, 'Date') ? content.getString('✎ Date') : undefined;
const right = rightEnabled ? nested(instance, 'RightAddon') : undefined;
const rightPreset = right?.getEnum('Preset', { SwapMe: 'custom', Controls: 'controls' });
if (right && !rightPreset) throw new Error('Неизвестный правый аддон');
const customActions = rightPreset === 'custom' && right ? childCode(right) : undefined;
const needsActions = rightPreset === 'custom' && !customActions;
const leftCode = leftPreset === 'swap' ? childCode(left) : render(left);
const needsLeftContent = leftPreset === 'swap' && !leftCode;
const contentCode = render(content);
const actionsCode = rightPreset === 'controls' && right ? render(right) : customActions;
const download = rightPreset === 'controls' && right ? booleanProperty(right, 'Download') : false;
const showDelete = rightPreset === 'controls' && right ? booleanProperty(right, 'Delete') : false;
const showRestore =
    rightPreset === 'controls' && right ? booleanProperty(right, 'Restore') : preset === 'deleted';
if (showRestore && (showDelete || download))
    throw new Error('Восстановление скрывает удаление и скачивание в API FileUploadItem');
if (preset === 'deleted' && !showRestore)
    throw new Error('Deleted требует showRestore для отображения подписи Файл удалён');
if (preset === 'default' && showRestore)
    throw new Error('showRestore заменяет стандартную подпись состоянием удаления');
const requiresIcon = leftPreset === 'custom' || leftPreset === 'file';
const requiresImage = leftPreset === 'image' || leftPreset === 'deleted-image';
// Иконка по расширению файла зависит от настоящего имени; без расширения Figma не даёт надёжного соответствия.
// Поэтому для выбранного файлового пресета нужен типизированный customIcon, а не выдуманный filename.
const fields = [
    preset === 'custom' || preset === 'initial' || preset === 'limit' ? 'customContent' : '',
    requiresIcon ? 'customIcon' : '',
    requiresImage ? 'imageUrl' : '',
    status === 'UPLOADING' ? 'progressBar' : '',
    download ? 'downloadLink' : '',
    showDelete ? 'onDelete' : '',
    showRestore ? 'onRestore' : '',
].filter(Boolean);
const typeFields = [
    ...fields.map((field) => `${field}: NonNullable<FileUploadItemProps['${field}']>`),
    ...(needsLeftContent ? ['leftContent: React.ReactNode'] : []),
    ...(needsActions ? ['actions: React.ReactNode'] : []),
].join('; ');
const parameterFields = [
    ...fields,
    ...(needsLeftContent ? ['leftContent'] : []),
    ...(needsActions ? ['actions'] : []),
];

export default {
    id: 'core-FileUploadItem',
    imports: [
        "import { FileUploadItem } from '@alfalab/core-components/file-upload-item';",
        "import type { FileUploadItemProps } from '@alfalab/core-components/file-upload-item';",
    ],
    example: figma.code`function Example({ ${parameterFields.join(', ')} }: { ${typeFields} }) {
  return <FileUploadItem ${status ? figma.code`uploadStatus="${status}"` : ''} ${title === undefined ? '' : figma.code`title={${JSON.stringify(title)}}`} ${subtitle === undefined ? '' : figma.code`subtitle={${JSON.stringify(subtitle)}}`} ${errors ? figma.code`error={${JSON.stringify(errors)}}` : ''}
    ${size === undefined ? '' : figma.code`size={${JSON.stringify(size)}}`} ${uploadDate === undefined ? '' : figma.code`uploadDate={${JSON.stringify(uploadDate)}}`} ${requiresIcon ? 'customIcon={customIcon}' : ''} ${requiresImage ? 'imageUrl={imageUrl}' : ''} ${preset === 'custom' || preset === 'initial' || preset === 'limit' ? 'customContent={customContent}' : ''} ${status === 'UPLOADING' ? 'progressBar={progressBar}' : ''}
    ${iconStyle === 'none' ? '' : figma.code`iconStyle="${iconStyle}"`} progressBarAvailable={${progressAvailable && status !== 'LOADING' ? 'true' : 'false'}} showDelete={${showDelete ? 'true' : 'false'}} showRestore={${showRestore ? 'true' : 'false'}} ${download ? 'downloadLink={downloadLink}' : ''} ${showDelete ? 'onDelete={onDelete}' : ''} ${showRestore ? 'onRestore={onRestore}' : ''}
  >${leftCode || (needsLeftContent ? figma.code`{leftContent}` : '')}${contentCode}${actionsCode || (needsActions ? figma.code`{actions}` : '')}</FileUploadItem>;
}`,
    metadata: {
        nestable: false,
        props: {
            contextFields: parameterFields,
            contextReason:
                'Файловый preset без настоящего расширения не определяет customIcon; URL, числовой прогресс, обработчики и произвольное содержимое отсутствуют в свойствах Figma',
        },
    },
};

// url=https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=57-3961
// source=packages/pagination/src/Component.tsx
// component=Pagination
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
function booleanProperty(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') throw new Error(`Не прочитано логическое свойство ${name}`);
    return value;
}
function flag(owner: InstanceHandle, name: string): boolean {
    const value = owner.getEnum(name, { False: false, True: true });
    if (typeof value !== 'boolean') throw new Error(`Неизвестное значение ${name}`);
    return value;
}
function nested(owner: InstanceHandle, name: string): InstanceHandle {
    const child = owner.findInstance(name);
    if (!child || child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
}
const view = instance.getEnum('View', { Default: 'default', 'Per-page': 'per-page' });
if (!view) throw new Error('Неизвестный View пагинации');
const left = booleanProperty(instance, 'ArrowLeft');
const right = booleanProperty(instance, 'ArrowRight');
if (view === 'per-page' && (!left || !right))
    throw new Error('Per-page в коде всегда показывает обе стрелки');
export default {
    id: 'core-pagination',
    imports: [
        "import { Pagination } from '@alfalab/core-components/pagination';",
        "import type { PaginationProps } from '@alfalab/core-components/pagination';",
    ],
    example: figma.code`function Example({ currentPageIndex, pagesCount, onPageChange }: Pick<PaginationProps, 'currentPageIndex' | 'pagesCount' | 'onPageChange'>) {
    if (!Number.isInteger(pagesCount) || pagesCount < 1 || !Number.isInteger(currentPageIndex) || currentPageIndex < 0 || currentPageIndex >= pagesCount) throw new Error('Некорректная текущая страница или число страниц');
    ${view === 'default' ? figma.code`if ((${left} !== (currentPageIndex > 0)) || (${right} !== (currentPageIndex < pagesCount - 1))) throw new Error('Видимость стрелок в Figma не согласована с переданными данными');` : ''}
    return <Pagination view="${view}" currentPageIndex={currentPageIndex} pagesCount={pagesCount} onPageChange={onPageChange} />;
}`,
    metadata: { nestable: false },
};

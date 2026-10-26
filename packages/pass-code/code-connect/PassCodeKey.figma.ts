// url=https://www.figma.com/design/jDJxQE1knc3NySMBYYiBYf/Web----Core?node-id=2351-11311
// source=packages/pass-code/src/components/KeyPadButton/Component.tsx
// component=KeyPadButton
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;

// Неподключённый INSTANCE возвращает комментарий вместо JSX, поэтому его нельзя молча встраивать.
function connectedExample(owner: InstanceHandle, label: string) {
    if (!owner.hasCodeConnect()) throw new Error(`Нет Code Connect для ${label}`);
    const result = owner.executeTemplate();
    if (result.metadata?.nestable === false)
        throw new Error(`Для ${label} требуется отдельный продуктовый контекст`);
    // hasCodeConnect может быть true у базовой ссылки, которую render позднее превратит в комментарий.
    function assertResolved(sections: ResultSection[]) {
        for (const section of sections) {
            if (section.type === 'ERROR')
                throw new Error(`Не удалось получить код для ${label}: ${section.message}`);
            if (section.type === 'INSTANCE') {
                if (!section.resultSections?.length)
                    throw new Error(`Не разрешён вложенный INSTANCE для ${label}`);
                assertResolved(section.resultSections);
            }
        }
    }
    assertResolved(result.example);
    return result.example;
}

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
const type = instance.getEnum('Type', {
    Blank: 'blank',
    Icon: 'icon',
    Digit: 'digit',
    Text: 'text',
});
if (!type) throw new Error('Неизвестный Type Key');
let content;
if (type === 'icon') {
    const icon = instance.getInstanceSwap('icon');
    if (!icon || icon.type !== 'INSTANCE') throw new Error('Не найдена подстановка icon');
    content = connectedExample(icon, `иконки Key: ${icon.name}`);
} else if (type !== 'blank') content = figma.code`{${JSON.stringify(instance.getString('✎ N'))}}`;
export default {
    id: 'core-pass-code-key',
    imports: [
        "import { KeyPadButton } from '@alfalab/core-components/pass-code/components/KeyPadButton';",
    ],
    example:
        type === 'blank'
            ? figma.code`<div />`
            : figma.code`<KeyPadButton view="${type === 'digit' ? 'secondary' : 'text'}">${content}</KeyPadButton>`,
    metadata: { nestable: true },
};

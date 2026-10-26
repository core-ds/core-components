// url=https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=2832-8162
// source=packages/navigation-bar/src/Component.tsx
// component=NavigationBar
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
const align = instance.getEnum('Align', { Center: 'center', Left: 'left' });
const bottom = flag(instance, 'BottomAddon');
const border = booleanProperty(instance, 'Border');
if (!align) throw new Error('Неизвестное выравнивание NavigationBar');
// SwapMe/BottomAddon — пустые Fixer, а не SLOT: содержимое нельзя достоверно получить.
if (bottom) throw new Error('BottomAddon=True не содержит настоящего SLOT или INSTANCE_SWAP');
const main = nested(instance, align === 'center' ? 'CentredMainSlot' : 'LeftMainSlot');
const content = main.getEnum('Content', {
    SwapMe: 'custom',
    Blank: 'blank',
    'Title+subtitle': 'both',
    Title: 'title',
});
if (!content) throw new Error('Неизвестный Content основной области');
if (content === 'custom') throw new Error('MainSlot=SwapMe не содержит настоящего SLOT');
const title = content === 'title' || content === 'both' ? main.getString('✎ Title') : undefined;
const subtitle = content === 'both' ? main.getString('✎ Subtitle') : undefined;
function action(owner: InstanceHandle, right: boolean) {
    const kind = owner.getEnum(
        'Content',
        right
            ? {
                  FloatedCross: 'close',
                  Blank: 'blank',
                  SwapMe: 'custom',
                  ActionSecondary: 'secondary',
                  ActionPrimary: 'primary',
                  Icons: 'icons',
              }
            : {
                  Back: 'back',
                  Blank: 'blank',
                  SwapMe: 'custom',
                  ActionSecondary: 'secondary',
                  ActionPrimary: 'primary',
                  FloatedBack: 'floatingBack',
              },
    );
    if (!kind) throw new Error('Неизвестный Content дополнения');
    if (kind === 'custom') throw new Error('Addon=SwapMe не содержит настоящего SLOT');
    if (kind === 'blank') return undefined;
    if (kind === 'primary' || kind === 'secondary') {
        return figma.code`<ActionTextAddon action="${kind}" ${figma.helpers.react.renderProp('text', owner.getString('✎ Label'))} />`;
    }
    if (kind === 'icons') {
        const second = booleanProperty(owner, '2 icon');
        const third = booleanProperty(owner, '3 icon');
        const icons = owner
            .findLayers((node) => node.type === 'INSTANCE' && node.name === '[D] IconButton')
            .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
        const expectedCount = 1 + Number(second) + Number(third);
        if (icons.length !== 3 && icons.length !== expectedCount)
            throw new Error('Не найдены включённые кнопки RightAddon');
        const visible =
            icons.length === 3
                ? icons.filter((_, index) => index === 0 || (index === 1 ? second : third))
                : icons;
        const one = connectedExample(visible[0], 'первой кнопки RightAddon');
        const two = visible[1]
            ? connectedExample(visible[1], 'второй кнопки RightAddon')
            : undefined;
        const three = visible[2]
            ? connectedExample(visible[2], 'третьей кнопки RightAddon')
            : undefined;
        return figma.code`<>${one}${two || ''}${three || ''}</>`;
    }
    return figma.code`<ActionIconAddon action="${kind}" />`;
}
const left = align === 'center' ? action(nested(instance, 'LeftAddon'), false) : undefined;
const right = action(nested(instance, 'RightAddon'), true);
export default {
    id: 'core-navigation-bar',
    imports: [
        "import { NavigationBar } from '@alfalab/core-components/navigation-bar';",
        "import { ActionIconAddon, ActionTextAddon } from '@alfalab/core-components/navigation-bar/shared';",
    ],
    example: figma.code`<NavigationBar align="${align}" ${border ? 'border' : ''}
        ${figma.helpers.react.renderProp('title', title)} ${figma.helpers.react.renderProp('subtitle', subtitle)}
        ${left ? figma.code`leftAddons={${left}}` : ''} ${right ? figma.code`rightAddons={${right}}` : ''} />`,
    metadata: { nestable: true },
};

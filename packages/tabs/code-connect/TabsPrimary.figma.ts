// url=https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=1-3212
// source=packages/tabs/src/components/primary-tablist/Component.desktop.tsx
// component=PrimaryTabListDesktop
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
const scrollable = booleanProperty(instance, 'Slider');
const tabs = instance
    .findLayers((node) => node.type === 'INSTANCE' && node.name === 'TabPrimary')
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
if (!tabs.length) throw new Error('Не найдены TabPrimary');
const selected = tabs.map((tab) => flag(tab, 'ActiveState'));
if (selected.filter(Boolean).length !== 1)
    throw new Error('Должна быть выбрана ровно одна вкладка');
const selectedIndex = selected.indexOf(true);
const titles = tabs.map((tab, index) => {
    const disabled = flag(tab, 'DisabledState');
    let addon;
    if (booleanProperty(tab, 'Addon')) {
        const detail = nested(tab, '🔩 Addon');
        const type = detail.getEnum('Type', {
            SwapMe: 'custom',
            'Icon 24': 'Icon 24',
            'Icon 16': 'Icon 16',
        });
        if (!type) throw new Error('Неизвестный Type дополнения вкладки');
        if (type === 'custom') throw new Error('Addon=SwapMe не содержит настоящего SLOT');
        const icon = detail.getInstanceSwap(type);
        if (!icon || icon.type !== 'INSTANCE') throw new Error('Не найдена подстановка иконки');
        addon = connectedExample(icon, `иконки TabPrimary: ${icon.name}`);
    }
    return figma.code`{ id: ids[${index}], title: ${JSON.stringify(tab.getString('✎ Label'))}, disabled: ${disabled}, ${addon ? figma.code`rightAddons: ${addon},` : ''} },`;
});
const tuple = Array.from({ length: tabs.length }, () => "TabListTitle['id']").join(', ');
export default {
    id: 'core-tabs-primary',
    imports: [
        "import React from 'react';",
        "import { PrimaryTabListDesktop } from '@alfalab/core-components/tabs/desktop';",
        "import type { TabListTitle, TabListProps } from '@alfalab/core-components/tabs/shared';",
    ],
    // Figma: шрифт 18/24, отступ снизу 12 и интервал 24 соответствуют textStyle paragraph-primary-large.
    // Left/Right вложенного Slider задаёт видимую позицию скролла; в коде её рассчитывает ScrollableContainer.
    example: figma.code`function Example({ ids, onChange }: { ids: [${tuple}]; onChange?: TabListProps['onChange'] }) {
    if (new Set(ids).size !== ids.length) throw new Error('Идентификаторы вкладок должны быть уникальны');
    const [selectedId, setSelectedId] = React.useState<TabListTitle['id']>(ids[${selectedIndex}]);
    return <PrimaryTabListDesktop textStyle="paragraph-primary-large" ${scrollable ? 'scrollable' : ''} selectedId={selectedId}
        onChange={(event, payload) => { setSelectedId(payload.selectedId); onChange?.(event, payload); }} titles={[${titles}]} />;
}`,
    metadata: { nestable: false },
};

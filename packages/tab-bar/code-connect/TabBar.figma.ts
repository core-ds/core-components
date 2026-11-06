// url=https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=2402-3975
// source=packages/tab-bar/src/Component.tsx
// component=TabBar
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
const bgColor = instance.getEnum('BgColor', {
    'Modal-bg-primary': 'modal-bg-primary',
    'Modal-bg-alt-primary': 'modal-bg-alt-primary',
});
if (!bgColor) throw new Error('Неизвестный BgColor');
// Overlap управляет видимостью вложенного в Border вектора (подтверждено componentPropertyReferences).
const border = booleanProperty(instance, 'Overlap');
const visibility = [
    true,
    true,
    booleanProperty(instance, 'Tab 3'),
    booleanProperty(instance, 'Tab 4'),
    booleanProperty(instance, 'Tab 5'),
];
const allTabs = instance
    .findLayers(
        (node) =>
            node.type === 'INSTANCE' &&
            (node.name === 'TabModalBgPrimary' || node.name === 'TabModalBgAltPrimary'),
    )
    .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
// Runtime может исключать скрытые дочерние слои. Оба представления сохраняют порядок видимых Tab.
const expectedCount = visibility.filter(Boolean).length;
if (allTabs.length !== 5 && allTabs.length !== expectedCount)
    throw new Error('Число Tab не согласовано с переключателями видимости');
const tabs = allTabs.length === 5 ? allTabs.filter((_, index) => visibility[index]) : allTabs;
const selected = tabs.map((tab) => flag(tab, 'Selected'));
if (selected.filter(Boolean).length > 1)
    throw new Error('В Tabbar может быть выбран только один Tab');
const accents = tabs.map((tab) =>
    tab.getEnum('AccentColor', { Primary: 'primary', Secondary: 'secondary' }),
);
if (accents.some((value) => value === undefined)) throw new Error('Неизвестный AccentColor');
const selectedIndex = selected.indexOf(true);
const accent = selectedIndex < 0 ? undefined : accents[selectedIndex];
const children = tabs.map((tab, index) => {
    const icon = tab.getInstanceSwap('Instance');
    if (!icon || icon.type !== 'INSTANCE') throw new Error('Не найдена иконка Tab');
    const iconCode = connectedExample(icon, `иконки Tab: ${icon.name}`);
    const showIndicator = booleanProperty(tab, 'Indicator');
    let value;
    if (showIndicator) {
        const indicator = nested(
            tab,
            bgColor === 'modal-bg-primary' ? '🔩 IndicatorModalBg' : '🔩 IndicatorModalBgAlt',
        );
        const numbered = flag(indicator, 'Content');
        if (numbered) {
            const text = indicator.getString('Value');
            if (!/^\d+$/.test(text))
                throw new Error('Индикатор Tab должен содержать целое неотрицательное число');
            value = Number(text);
        }
    }
    return figma.code`<TabBar.Tab id={ids[${index}]} ${figma.helpers.react.renderProp('label', tab.getString('✎ TabName'))} icon={${iconCode}} ${showIndicator ? 'showIndicator' : ''}
        ${value === undefined ? '' : figma.code`indicatorProps={{ value: ${value} }}`} />`;
});
const idTuple = Array.from({ length: tabs.length }, () => 'string').join(', ');
export default {
    id: 'core-tab-bar',
    imports: [
        "import React from 'react';",
        "import { TabBar } from '@alfalab/core-components/tab-bar';",
        "import type { TabBarProps } from '@alfalab/core-components/tab-bar';",
    ],
    example: figma.code`function Example({ ids, onChange }: { ids: [${idTuple}]; onChange?: TabBarProps['onChange'] }) {
    if (ids.some(id => !id) || new Set(ids).size !== ids.length) throw new Error('Нужны уникальные непустые идентификаторы Tab');
    const [selectedId, setSelectedId] = React.useState<string | undefined>(${selectedIndex < 0 ? 'undefined' : figma.code`ids[${selectedIndex}]`});
    return <TabBar bgColor="${bgColor}" ${figma.helpers.react.renderProp('accentColor', accent)} ${border ? 'border' : ''} selectedId={selectedId} onChange={id => { setSelectedId(id); onChange?.(id); }}>
        ${children}
    </TabBar>;
}`,
    metadata: { nestable: false },
};

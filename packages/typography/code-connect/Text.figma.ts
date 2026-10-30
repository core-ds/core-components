// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=28-29546
// source=packages/typography/src/text/component.tsx
// component=Typography.Text
import figma from 'figma';
const instance = figma.selectedInstance;
const text = instance.getString('✎ Value');
// Text Style/weight/color/выравнивание не являются properties. Нужен внешний контекст.
// ComponentProps сохраняет discriminated union tag/defaultMargins; children из Figma перекрывают контекст.
// Фон именно под строкой (textBackgroundColor) требует standalone Text; этот шаблон выводит контент Typography.Text.
export default {
    id: 'core-typography-text-content',
    imports: [
        "import { Typography } from '@alfalab/core-components/typography';",
        "import type { ComponentProps } from 'react';",
    ],
    example: figma.code`function Example({ textProps }: { textProps: ComponentProps<typeof Typography.Text> }) {
        return <Typography.Text {...textProps}>{${JSON.stringify(text)}}</Typography.Text>;
    }`,
    metadata: { nestable: false },
};

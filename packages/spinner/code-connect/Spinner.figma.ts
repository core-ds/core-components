// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=24-19668
// source=packages/spinner/src/index.ts
// component=Spinner
import figma from 'figma';
const instance = figma.selectedInstance;

const preset = instance.getEnum('Size', { '16': 16, '24': 24, '48': 48 });
const colors = instance.getEnum('Inverted', {
    False: 'default',
    True: 'inverted',
});
const isStatic = instance.getEnum('Static', { False: false, True: true });
if (!preset || !colors || isStatic === undefined) throw new Error('Неизвестный вариант Spinner');
// Static — палитра, не управление анимацией. CSS token передаётся явно.
export default {
    id: 'core-spinner',
    imports: ["import { Spinner } from '@alfalab/core-components/spinner';"],
    example: figma.code`${isStatic ? 'function Example({ staticColor }: { staticColor: string }) { return (' : ''}<Spinner visible preset={${preset}} colors="${colors}" ${isStatic ? 'style={{ color: staticColor }}' : ''} />${isStatic ? '); }' : ''}`,
    metadata: { nestable: false },
};

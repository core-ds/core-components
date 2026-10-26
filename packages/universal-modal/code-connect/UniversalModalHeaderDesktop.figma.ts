// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=50305-25072
// source=packages/universal-modal/src/desktop/components/header/index.tsx
// component=HeaderDesktop
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const custom = instance.getEnum('Custom', { False: false, True: true });
const filledBackground = instance.getEnum('FilledBg', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// FilledBg и Overlap — визуальное состояние; не назначаем backgroundColor/sticky по одному кадру.
let standardProps = figma.code``;
if (hasContent && !custom) {
    const preset = instance.findInstance('Presets');
    if (preset.type !== 'INSTANCE')
        throw new Error('UniversalModal Header: source preset is missing');
    const closer = preset.getEnum('Cross', { False: false, True: true });
    const back = preset.getEnum('Back', { False: false, True: true });
    const titleVisible = preset.getEnum('Title', { False: false, True: true });
    const bigTitle = preset.getEnum('BigTitle', { False: false, True: true });
    const title = preset.getString('✎ Title');
    standardProps = figma.code`hasCloser={${closer}} hasBackButton={${back}} bigTitle={${bigTitle}} ${titleVisible || bigTitle ? figma.code`title={${JSON.stringify(title)}}` : ''}`;
}
const example = !hasContent
    ? figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof HeaderDesktop>['sticky']> }) {
  return <HeaderDesktop sticky={sticky} hasCloser={false} />;
 }`
    : custom
      ? figma.code`function Example({ headerProps }: { headerProps: ComponentProps<typeof HeaderDesktop> }) {
  return <HeaderDesktop {...headerProps} />;
 }`
      : figma.code`function Example({ headerContext }: { headerContext: Pick<ComponentProps<typeof HeaderDesktop>, 'sticky' | 'onBack' | 'backButtonProps'> }) {
  return <HeaderDesktop {...headerContext} ${standardProps} />;
 }`;

export default {
    id: 'core-universal-modal-universalmodalheaderdesktop',
    imports: [
        "import { HeaderDesktop } from '@alfalab/core-components/universal-modal/desktop';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'header',
            requiresParent: 'UniversalModalDesktop',
            composition: 'part',
            figmaOverlap: overlap,
            figmaFilledBackground: filledBackground,
            custom: custom,
            contentMode: hasContent,
        },
    },
};

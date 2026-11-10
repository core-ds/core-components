// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=50305-25039
// source=packages/universal-modal/src/mobile/components/header/index.tsx
// component=HeaderMobile
import figma from 'figma';
const instance = figma.selectedInstance;
const hasContent = instance.getEnum('Content', { False: false, True: true });
const custom = instance.getEnum('Custom', { False: false, True: true });
const filledBackground = instance.getEnum('FilledBg', { False: false, True: true });
const overlap = instance.getBoolean('↳ Overlap');
// FilledBg и Overlap — визуальное состояние; не назначаем backgroundColor/sticky по одному кадру.
let standardProps = figma.code``;
if (hasContent && !custom) {
    const preset = instance.findInstance('Preset');
    if (preset.type !== 'INSTANCE')
        throw new Error('UniversalModal Header: source preset is missing');
    const closer = preset.getEnum('Cross', { False: false, True: true });
    const back = preset.getEnum('Back', { False: false, True: true });
    const leftTitle = preset.getEnum('LeftTitle', { False: false, True: true });
    const centredTitle = preset.getEnum('CentredTitle', { False: false, True: true });
    if (leftTitle && centredTitle)
        throw new Error('UniversalModal Header: conflicting LeftTitle/CentredTitle');
    const subtitle = preset.getEnum('Subtitle', { False: false, True: true });
    const title = preset.getString('✎ Title');
    const subtitleText = preset.getString('✎ Subtitle');
    standardProps = figma.code`hasCloser={${closer}} hasBackButton={${back}} ${leftTitle || centredTitle ? figma.code`title={${JSON.stringify(title)}} titleSize="compact" align="${centredTitle ? 'center' : 'left'}"` : ''} ${subtitle ? figma.code`subtitle={${JSON.stringify(subtitleText)}}` : ''}`;
}
const example = !hasContent
    ? figma.code`function Example({ sticky }: { sticky: NonNullable<ComponentProps<typeof HeaderMobile>['sticky']> }) {
  return <HeaderMobile sticky={sticky} hasCloser={false} />;
 }`
    : custom
      ? figma.code`function Example({ headerProps }: { headerProps: ComponentProps<typeof HeaderMobile> }) {
  return <HeaderMobile {...headerProps} />;
 }`
      : figma.code`function Example({ headerContext }: { headerContext: Pick<ComponentProps<typeof HeaderMobile>, 'sticky' | 'onBack' | 'backButtonProps'> }) {
  return <HeaderMobile {...headerContext} ${standardProps} />;
 }`;

export default {
    id: 'core-universal-modal-universalmodalheadermobile',
    imports: [
        "import { HeaderMobile } from '@alfalab/core-components/universal-modal/mobile';",
        "import type { ComponentProps } from 'react';",
    ],
    example: example,
    metadata: {
        nestable: false,
        props: {
            role: 'header',
            requiresParent: 'UniversalModalMobile',
            composition: 'part',
            figmaOverlap: overlap,
            figmaFilledBackground: filledBackground,
            custom: custom,
            contentMode: hasContent,
        },
    },
};

/**
 * Figma Code Connect — diamonds (glyph-26) для слотов Button Addon.
 * Size=m → 24dp; Size=s → 20dp через Icon20Adapter.
 */
import figma from '@figma/code-connect/react';
import { Diamonds20Icon } from '@alfalab/icons-glyph-26/Diamonds20Icon';
import { Diamonds24Icon } from '@alfalab/icons-glyph-26/Diamonds24Icon';
import { Icon20Adapter } from '@alfalab/core-components-shared/icon-20-adapter';

const DIAMONDS = 'https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888';

figma.connect(Diamonds24Icon, DIAMONDS, {
    variant: { Size: 'm' },
    example: () => <Diamonds24Icon />,
});

figma.connect(Icon20Adapter, DIAMONDS, {
    variant: { Size: 's' },
    example: () => <Icon20Adapter icon={Diamonds20Icon} />,
});

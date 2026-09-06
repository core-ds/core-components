/**
 * Figma Code Connect — diamonds (glyph-26).
 * Нужен при инспекции самой иконки в библиотеке Icons.
 * В Button слот Addon мапится отдельно (через Type), т.к. children не проходит FRAME.
 */
import figma from '@figma/code-connect/react';
import { Diamonds20Icon } from '@alfalab/icons-glyph-26/Diamonds20Icon';
import { Diamonds24Icon } from '@alfalab/icons-glyph-26/Diamonds24Icon';
import { Icon20Adapter } from '@alfalab/core-components-shared/icon-20-adapter';

figma.connect(
    Diamonds24Icon,
    'https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888',
    {
        variant: { Size: 'm' },
        example: () => <Diamonds24Icon />,
    },
);

figma.connect(
    Icon20Adapter,
    'https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888',
    {
        variant: { Size: 's' },
        example: () => <Icon20Adapter icon={Diamonds20Icon} />,
    },
);

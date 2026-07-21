/**
 * Figma Code Connect — 🔩 Addon (слот Button leftAddons / rightAddons).
 * Type=Spinner → пустой сниппет (у Button это loading={true}).
 * Type=Icon-* → вложенная иконка (glyph).
 */
import figma from '@figma/code-connect/react';

figma.connect('https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=12-2835', {
    variant: { Type: 'Icon-24' },
    props: { icon: figma.children('*') },
    example: ({ icon }) => icon,
});

figma.connect('https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=12-2835', {
    variant: { Type: 'SwapMe' },
    props: { icon: figma.children('*') },
    example: ({ icon }) => icon,
});

figma.connect('https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=12-2835', {
    variant: { Type: 'Indicator' },
    props: { icon: figma.children('*') },
    example: ({ icon }) => icon,
});

figma.connect('https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=12-2835', {
    variant: { Type: 'Spinner' },
    example: () => null,
});

figma.connect(
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=39632-37218',
    {
        variant: { Type: 'Icon-20' },
        props: { icon: figma.children('*') },
        example: ({ icon }) => icon,
    },
);

figma.connect(
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=39632-37218',
    {
        variant: { Type: 'Icon-16' },
        props: { icon: figma.children('*') },
        example: ({ icon }) => icon,
    },
);

figma.connect(
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=39632-37218',
    {
        variant: { Type: 'SwapMe' },
        props: { icon: figma.children('*') },
        example: ({ icon }) => icon,
    },
);

figma.connect(
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=39632-37218',
    {
        variant: { Type: 'Indicator' },
        props: { icon: figma.children('*') },
        example: ({ icon }) => icon,
    },
);

figma.connect(
    'https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=39632-37218',
    {
        variant: { Type: 'Spinner' },
        example: () => null,
    },
);

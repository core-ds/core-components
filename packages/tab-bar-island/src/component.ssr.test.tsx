import React from 'react';
import { renderToString } from 'react-dom/server';

import { TabBarIsland } from '@alfalab/core-components-tab-bar-island';
import DiamondsMIcon from '@alfalab/icons-glyph/DiamondsMIcon';

test('TabBarIsland', () => {
    let htmlString: string | undefined;

    expect(() => {
        htmlString = renderToString(
            <TabBarIsland
                items={[
                    {
                        key: 1,
                        icon: <DiamondsMIcon />,
                        label: 'Label',
                    },
                    {
                        key: 2,
                        icon: <DiamondsMIcon />,
                        label: 'Label',
                    },
                ]}
            />,
        );
    }).not.toThrow();

    expect(htmlString).toEqual(expect.any(String));
});

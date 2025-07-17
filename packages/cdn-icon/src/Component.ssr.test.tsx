import React from 'react';
import { renderToString } from 'react-dom/server';

import { CDNIcon } from '.';

test('CDNIcon', () => {
    let htmlString: string | undefined;

    expect(() => {
        htmlString = renderToString(<CDNIcon name='glyph_debt_m' />);
    }).not.toThrow();

    expect(htmlString).toEqual(expect.any(String));
});

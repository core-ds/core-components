import React from 'react';
import { renderToString } from 'react-dom/server';

import { Accordion } from '.';

test('Accordion', () => {
    let htmlString: string | undefined;

    expect(() => {
        htmlString = renderToString(<Accordion header={null} />);
    }).not.toThrow();

    expect(htmlString).toEqual(expect.any(String));
});

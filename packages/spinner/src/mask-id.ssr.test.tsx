import React from 'react';
import { renderToString } from 'react-dom/server';

import { Spinner } from './Component';

describe('Серверные маски Spinner', () => {
    it('различает маски независимых серверных приложений без предупреждений', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

        try {
            const firstHtml = renderToString(<Spinner preset={24} visible={true} />);
            const secondHtml = renderToString(<Spinner preset={24} visible={true} />);
            const firstMaskId = firstHtml.match(/<mask id="([^"]+)"/)?.[1];
            const secondMaskId = secondHtml.match(/<mask id="([^"]+)"/)?.[1];

            expect(firstMaskId).toBeTruthy();
            expect(secondMaskId).toBeTruthy();
            expect(firstMaskId).not.toBe(secondMaskId);
            expect(firstHtml).toContain(`mask="url(#${firstMaskId})"`);
            expect(secondHtml).toContain(`mask="url(#${secondMaskId})"`);
            expect(consoleError).not.toHaveBeenCalled();
        } finally {
            consoleError.mockRestore();
        }
    });
});

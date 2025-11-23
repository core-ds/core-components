import { type ReactElement } from 'react';
import { act } from 'react-dom/test-utils';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';

export const asyncRender = async (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>,
): Promise<RenderResult> => {
    let result;

    await act(async () => {
        result = await render(ui, options);
    });

    return result as unknown as RenderResult;
};

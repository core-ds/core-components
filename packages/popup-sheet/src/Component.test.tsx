import React, { ReactNode } from 'react';
import { PopupSheet, PopupSheetProps } from './Component';
import { act, render, RenderResult } from '@testing-library/react';
import { getPopupSheetTestIds } from './utils';

const renderPopupSheet = async (
    props: PopupSheetProps & { children: ReactNode },
): Promise<RenderResult | undefined> => {
    let result: RenderResult | undefined;

    await act(async () => {
        result = await render(<PopupSheet {...props}>{props.children}</PopupSheet>);
    });

    return result;
};

describe('PopupSheet', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
    describe('Snapshot tests', () => {
        it('should match snapshot', async () => {
            const component = await renderPopupSheet({
                children: <div style={{ height: 50 }}>PopupSheet</div>,
                open: true,
            });

            expect(component).toMatchSnapshot();
        });
    });

    describe('attributes test', () => {
        it('should have data-test-id', () => {
            const dti = 'popup-sheet-dti';

            const { getByTestId } = render(
                <PopupSheet hasCloser={true} open={true} dataTestId={dti}>
                    <div style={{ height: 50 }} />
                </PopupSheet>,
            );

            const testIds = getPopupSheetTestIds(dti);

            expect(getByTestId(testIds.popupSheet)).toBeInTheDocument();
            expect(getByTestId(testIds.closer)).toBeInTheDocument();
        });
    });
});

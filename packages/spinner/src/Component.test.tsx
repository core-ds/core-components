import React from 'react';
import { render } from '@testing-library/react';
import { devWarning } from '@alfalab/core-components-shared';

import { Spinner } from './index';

jest.mock('@alfalab/hooks', () => ({ useId: () => 1 }));

jest.mock('@alfalab/core-components-shared', () => {
    const original = jest.requireActual('@alfalab/core-components-shared');
    return Object.assign({ __esModule: true }, original, { devWarning: jest.fn() });
});

const testId = 'spinner';

describe('Snapshots tests', () => {
    it('should display correctly', () => {
        const { container } = render(<Spinner size={20} lineWidth={2} style={{ padding: 2 }} />);

        expect(container).toMatchSnapshot();
    });
});

describe('Attributes tests', () => {
    it('should set data-test-id attribute', async () => {
        const className = 'custom';

        render(
            <Spinner
                size={20}
                lineWidth={2}
                style={{ padding: 2 }}
                className={className}
                dataTestId={testId}
            />,
        );

        const spinnerContentWrap = document.querySelector(`.${className}`);

        const testIdAttr = spinnerContentWrap?.getAttribute('data-test-id');

        expect(testIdAttr).toBe(testId);
    });
});

describe('Render tests', () => {
    it('should unmount without errors', async () => {
        const { unmount } = render(<Spinner size={20} lineWidth={2} style={{ padding: 2 }} />);

        expect(unmount).not.toThrow();
    });

    it('should have visible class if prop visible is true', async () => {
        const { getByTestId } = render(
            <Spinner
                size={20}
                lineWidth={2}
                style={{ padding: 2 }}
                dataTestId={testId}
                visible={true}
            />,
        );

        expect(getByTestId(testId)).toHaveClass('visible');
    });
});

describe('Spinner props', () => {
    it('should support `size` and `lineWidth`', () => {
        const { container } = render(<Spinner visible size={48} lineWidth={2} />);
        expect(container).toMatchSnapshot();
    });

    it('should set correct size', () => {
        const { container } = render(
            <Spinner visible size={40} lineWidth={2} style={{ padding: 4 }} />,
        );
        expect(container.firstElementChild).toHaveStyle({
            height: '40px',
            width: '40px',
            padding: '4px',
        });
    });

    it('should support `style`', () => {
        const color = '#EC2D20';
        const padding = 2;
        const { container } = render(
            <Spinner visible size={48} lineWidth={6} style={{ padding, color }} />,
        );
        expect(container).toMatchSnapshot();
        expect(container.firstElementChild).toHaveStyle({ color, padding: `${padding}px` });
    });

    it('should warn color via styles', () => {
        render(<Spinner visible size={48} lineWidth={6} style={{ color: '#EC2D20' }} />);
        expect(devWarning).toHaveBeenCalledWith(
            expect.stringContaining(
                "[Spinner]: Палитра, в контексте которой используется спиннер (проп 'colors') игнорируется.",
            ),
        );
    });

    it.each([16, 24, 48] as const)('should render preset %p correctly', (preset) => {
        const { container } = render(<Spinner visible preset={preset} />);
        expect(container).toMatchSnapshot();
    });
});

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { CDNIcon } from './index';
import * as useIconModule from './hooks/use-icon';

describe('CDNIcon', () => {
    /*
     * TODO падает на гитхабе
     * it('should use the `name` prop and becomes a svg', async () => {
     *     const { container } = render(<CDNIcon name='glyph_debt_m' />);
     *     await waitFor(() => expect(container.querySelector('svg')).not.toBe(null));
     * });
     */

    it('should pass an invalid value to the `name` prop', async () => {
        const { container } = render(<CDNIcon name='fake-fake-fake' />);
        await waitFor(() => {
            const span = container.querySelector('span');
            expect(span).toBeInTheDocument();
            expect(span).toBeEmptyDOMElement();
        });
    });

    it('should use the `color` prop', async () => {
        const color = '#ccc';
        const { container } = render(<CDNIcon name='glyph_debt_m' color={color} />);
        await waitFor(() => expect(container.firstElementChild).toHaveStyle(`color: ${color}`));
    });

    it('should use `className` prop', () => {
        const className = 'class';

        const { container } = render(<CDNIcon name='name' className={className} />);

        expect(container.firstElementChild).toHaveClass('class');
    });

    it('should render fallback node if loading failed', async () => {
        jest.spyOn(useIconModule, 'useIcon').mockReturnValue([
            undefined,
            useIconModule.LoadingStatus.FAILURE,
        ]);

        const fallbackText = 'fallback-node';
        const { container } = render(
            <CDNIcon name='fake' fallback={<span>{fallbackText}</span>} />,
        );

        await waitFor(() => {
            const span = container.querySelector('span');
            expect(span).toBeInTheDocument();
            expect(span).toHaveTextContent(fallbackText);
        });
    });

    it('should render fallback node if fallback is function', async () => {
        jest.spyOn(useIconModule, 'useIcon').mockReturnValue([
            undefined,
            useIconModule.LoadingStatus.FAILURE,
        ]);

        const fallbackText = 'fallback-fn';
        const fallbackFn = jest.fn(() => <span>{fallbackText}</span>);
        const { container } = render(<CDNIcon name='fake' fallback={fallbackFn} />);

        await waitFor(() => {
            const span = container.querySelector('span');
            expect(span).toBeInTheDocument();
            expect(span).toHaveTextContent(fallbackText);
        });
        expect(fallbackFn).toHaveBeenCalled();
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import { useMatchMedia } from './useMatchMedia';
import { getMatchMedia } from './utils';
import * as Hooks from '@alfalab/hooks';

jest.mock('./utils');

function mockGetMatchMedia(matches: boolean) {
    (getMatchMedia as jest.Mock).mockReturnValue({
        addListener: jest.fn,
        removeListener: jest.fn,
        matches,
    });
}

describe('useMatchMedia', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Hooks, 'useLayoutEffect_SAFE_FOR_SSR');
    });

    it('should try to reconcile each time', () => {
        mockGetMatchMedia(false);

        const Example = () => {
            const [matches] = useMatchMedia('--small-only');
            return <div>{JSON.stringify(matches)}</div>;
        };

        const { rerender, container } = render(<Example />);

        expect(container.firstElementChild).toHaveTextContent('false');
        expect(Hooks.useLayoutEffect_SAFE_FOR_SSR).toHaveBeenCalledTimes(1);

        rerender(<Example />);

        expect(container.firstElementChild).toHaveTextContent('false');
        expect(Hooks.useLayoutEffect_SAFE_FOR_SSR).toHaveBeenCalledTimes(3);
    });

    it('should be able to change the query dynamically', () => {
        mockGetMatchMedia(false);

        const Example = ({ query }: { query: string }) => {
            const [matches] = useMatchMedia(query);
            return <div>{JSON.stringify(matches)}</div>;
        };

        const { rerender, container } = render(<Example query='--small-only' />);

        expect(container.firstElementChild).toHaveTextContent('false');
        expect(Hooks.useLayoutEffect_SAFE_FOR_SSR).toHaveBeenCalledTimes(1);

        mockGetMatchMedia(true);

        rerender(<Example query='--desktop-m' />);
        expect(container.firstElementChild).toHaveTextContent('true');

        expect(Hooks.useLayoutEffect_SAFE_FOR_SSR).toHaveBeenCalledTimes(3);
    });
});

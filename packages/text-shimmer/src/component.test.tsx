import 'jest-canvas-mock';

import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Typography } from '@alfalab/core-components-typography';

import { useAnimationEnvironment } from './hooks/use-animation-environment';
import { TextShimmerParticleEngine } from './particle-engine';
import { TextShimmer } from './component';

jest.mock('./hooks/use-animation-environment', () => ({
    useAnimationEnvironment: jest.fn(() => ({
        prefersReducedMotion: false,
        documentVisible: true,
    })),
}));

const animationEnvironmentMock = useAnimationEnvironment as jest.MockedFunction<
    typeof useAnimationEnvironment
>;

describe('TextShimmer', () => {
    beforeEach(() => {
        animationEnvironmentMock.mockReturnValue({
            prefersReducedMotion: false,
            documentVisible: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders accessible text and forwards common props', () => {
        const rootRef = React.createRef<HTMLSpanElement>();
        const handleClick = jest.fn();

        render(
            <TextShimmer
                ref={rootRef}
                className='custom-class'
                dataTestId='text-shimmer'
                id='balance'
                dir='ltr'
                lang='ru'
                aria-label='Текущий баланс'
                style={{ minWidth: 120 }}
                onClick={handleClick}
            >
                −4 940 ₽
            </TextShimmer>,
        );

        const root = screen.getByTestId('text-shimmer');

        expect(root).toHaveTextContent('−4 940 ₽');
        expect(root).toHaveClass('custom-class');
        expect(root).not.toHaveAttribute('aria-busy');
        expect(root).toHaveAttribute('data-state', 'idle');
        expect(root).toHaveAttribute('id', 'balance');
        expect(root).toHaveAttribute('dir', 'ltr');
        expect(root).toHaveAttribute('lang', 'ru');
        expect(root).toHaveAttribute('aria-label', 'Текущий баланс');
        expect(root).toHaveStyle({ minWidth: '120px' });
        expect(rootRef.current).toBe(root);
        expect(root.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');

        fireEvent.click(root);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows particles and keeps the original text in the DOM while active', () => {
        render(
            <TextShimmer active={true} dataTestId='text-shimmer'>
                Будущий текст
            </TextShimmer>,
        );

        const root = screen.getByTestId('text-shimmer');

        expect(root).toHaveTextContent('Будущий текст');
        expect(root).toHaveAttribute('aria-busy', 'true');
        expect(root).toHaveAttribute('data-state', 'active');
        expect(root.querySelector('canvas')).toHaveClass('canvasVisible');
    });

    it('applies a custom particle color to the canvas', () => {
        render(
            <TextShimmer active={true} color='#ff0000' dataTestId='text-shimmer'>
                Цветной текст
            </TextShimmer>,
        );

        const root = screen.getByTestId('text-shimmer');

        expect(root.querySelector('canvas')).toHaveStyle({ color: '#ff0000' });
    });

    it('does not show an empty canvas when there is no text to scatter', () => {
        render(
            <TextShimmer active={true} dataTestId='text-shimmer'>
                {''}
            </TextShimmer>,
        );

        const root = screen.getByTestId('text-shimmer');

        expect(root.querySelector('canvas')).not.toHaveClass('canvasVisible');
    });

    it('supports numeric values', () => {
        render(<TextShimmer>{4940}</TextShimmer>);

        expect(screen.getByText('4940')).toBeInTheDocument();
    });

    it('preserves Core Typography text-layer semantics', () => {
        render(
            <React.Fragment>
                <Typography.Title tag='h2' dataTestId='title'>
                    <TextShimmer dataTestId='title-shimmer'>Счёт компании</TextShimmer>
                </Typography.Title>
                <Typography.Text tag='p' dataTestId='text'>
                    Доступно: <TextShimmer dataTestId='text-shimmer'>125 600 ₽</TextShimmer>
                </Typography.Text>
            </React.Fragment>,
        );

        const title = screen.getByTestId('title');
        const text = screen.getByTestId('text');

        expect(title.tagName).toBe('H2');
        expect(title).toContainElement(screen.getByTestId('title-shimmer'));
        expect(text.tagName).toBe('P');
        expect(text).toContainElement(screen.getByTestId('text-shimmer'));
    });

    it('disables particle and CSS motion independently from the active state', () => {
        const setEnvironment = jest.spyOn(TextShimmerParticleEngine.prototype, 'setEnvironment');

        render(
            <TextShimmer active={true} animate={false} dataTestId='text-shimmer'>
                Статичный текст
            </TextShimmer>,
        );

        const root = screen.getByTestId('text-shimmer');

        expect(setEnvironment).toHaveBeenCalledWith({
            documentVisible: true,
            prefersReducedMotion: true,
        });
        expect(root).toHaveClass('motionDisabled');
        expect(root.querySelector('canvas')).toHaveClass('canvasVisible');
    });

    it('keeps text visible when Canvas is unavailable', () => {
        jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValueOnce(null);

        render(
            <TextShimmer active={true} dataTestId='text-shimmer'>
                Доступный текст
            </TextShimmer>,
        );

        const root = screen.getByTestId('text-shimmer');
        const text = screen.getByText('Доступный текст');

        expect(text).not.toHaveClass('textHidden');
        expect(root.querySelector('canvas')).not.toHaveClass('canvasVisible');
        expect(root).toHaveAttribute('aria-busy', 'true');
    });

    it('assembles into an updated value without motion when reduced motion is enabled', async () => {
        animationEnvironmentMock.mockReturnValue({
            prefersReducedMotion: true,
            documentVisible: true,
        });

        const { rerender } = render(
            <TextShimmer active={true} dataTestId='text-shimmer'>
                Старый текст
            </TextShimmer>,
        );

        rerender(
            <TextShimmer active={true} dataTestId='text-shimmer'>
                Новый текст
            </TextShimmer>,
        );
        rerender(
            <TextShimmer active={false} dataTestId='text-shimmer'>
                Новый текст
            </TextShimmer>,
        );

        const root = screen.getByTestId('text-shimmer');

        expect(root).toHaveTextContent('Новый текст');
        await waitFor(() => {
            expect(root).not.toHaveAttribute('aria-busy');
            expect(root).toHaveAttribute('data-state', 'idle');
        });
    });

    it('does not hide a new particle state when an earlier assembly finishes', async () => {
        let completeAssembly: (completed: boolean) => void = () => undefined;
        const assembly = new Promise<boolean>((resolve) => {
            completeAssembly = resolve;
        });

        jest.spyOn(TextShimmerParticleEngine.prototype, 'assemble').mockReturnValue(assembly);

        const { rerender } = render(
            <TextShimmer active={true} dataTestId='text-shimmer'>
                Текст
            </TextShimmer>,
        );
        const root = screen.getByTestId('text-shimmer');

        expect(root.querySelector('canvas')).toHaveClass('canvasVisible');

        rerender(
            <TextShimmer active={false} dataTestId='text-shimmer'>
                Текст
            </TextShimmer>,
        );
        rerender(
            <TextShimmer active={true} dataTestId='text-shimmer'>
                Текст
            </TextShimmer>,
        );

        expect(root.querySelector('canvas')).toHaveClass('canvasVisible');

        await act(async () => {
            completeAssembly(true);
            await assembly;
        });

        expect(root).toHaveAttribute('data-state', 'active');
        expect(root.querySelector('canvas')).toHaveClass('canvasVisible');
    });
});

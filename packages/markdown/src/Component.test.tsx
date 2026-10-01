import React from 'react';
import { render, screen } from '@testing-library/react';
import { Markdown } from '@alfalab/core-components-markdown';
import { MarkdownDesktop } from '@alfalab/core-components-markdown/desktop';
import { MarkdownMobile } from '@alfalab/core-components-markdown/mobile';
import { type Root } from 'mdast';

let isDesktopViewport = false;

const matchMediaMock = jest.fn(
    (query: string): MediaQueryList => ({
        matches: isDesktopViewport,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }),
);

const headingRemarkPlugin =
    ({ depth = 1 }: { depth?: 1 | 2 } = {}) =>
    (tree: Root) => {
        tree.children = tree.children.map((node) =>
            node.type === 'paragraph' ? { type: 'heading', depth, children: node.children } : node,
        );
    };

const demoteHeadingRemarkPlugin = () => (tree: Root) => {
    tree.children = tree.children.map((node) =>
        node.type === 'heading' ? { ...node, depth: 2 } : node,
    );
};

type RemarkPlugins = NonNullable<React.ComponentProps<typeof Markdown>['remarkPlugins']>;

const pluginCases: Array<{ name: string; plugins: RemarkPlugins; level: number }> = [
    { name: 'a plugin without options', plugins: [headingRemarkPlugin], level: 1 },
    { name: 'a plugin with options', plugins: [[headingRemarkPlugin, { depth: 2 }]], level: 2 },
    {
        name: 'a preset with plugin options',
        plugins: [{ plugins: [[headingRemarkPlugin, { depth: 2 }]] }],
        level: 2,
    },
    { name: 'a plugin enabled with true', plugins: [[headingRemarkPlugin, true]], level: 1 },
];

const markdownText = 'Заголовок ~~зачёркнутый~~';

describe('Markdown', () => {
    const originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia');

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            writable: true,
            value: matchMediaMock,
        });
    });

    beforeEach(() => {
        isDesktopViewport = false;
        matchMediaMock.mockClear();
    });

    afterAll(() => {
        if (originalMatchMedia) {
            Object.defineProperty(window, 'matchMedia', originalMatchMedia);
        } else {
            Reflect.deleteProperty(window, 'matchMedia');
        }
    });

    describe.each([
        { name: 'responsive mobile', Component: Markdown, isDesktop: false },
        { name: 'responsive desktop', Component: Markdown, isDesktop: true },
        { name: 'desktop', Component: MarkdownDesktop, isDesktop: false },
        { name: 'mobile', Component: MarkdownMobile, isDesktop: false },
    ])('remarkPlugins: $name', ({ Component, isDesktop }) => {
        beforeEach(() => {
            isDesktopViewport = isDesktop;
        });

        it.each<{ name: string; plugins: RemarkPlugins | null | undefined }>([
            { name: 'undefined', plugins: undefined },
            { name: 'empty', plugins: [] },
            { name: 'null', plugins: null },
        ])('should preserve strikethrough when remarkPlugins is $name', ({ plugins }) => {
            render(<Component remarkPlugins={plugins}>{markdownText}</Component>);

            expect(screen.getByText('зачёркнутый').tagName).toBe('DEL');
            expect(screen.queryByRole('heading')).not.toBeInTheDocument();
        });

        it.each(pluginCases)(
            'should apply $name and preserve strikethrough',
            ({ plugins, level }) => {
                render(<Component remarkPlugins={plugins}>{markdownText}</Component>);

                expect(
                    screen.getByRole('heading', { level, name: 'Заголовок зачёркнутый' }),
                ).toBeInTheDocument();
                expect(screen.getByText('зачёркнутый').tagName).toBe('DEL');
            },
        );

        it('should apply multiple plugins in the supplied order', () => {
            render(
                <Component remarkPlugins={[headingRemarkPlugin, demoteHeadingRemarkPlugin]}>
                    {markdownText}
                </Component>,
            );

            expect(
                screen.getByRole('heading', { level: 2, name: 'Заголовок зачёркнутый' }),
            ).toBeInTheDocument();
            expect(screen.getByText('зачёркнутый').tagName).toBe('DEL');
        });

        it('should skip a plugin disabled with false', () => {
            render(
                <Component remarkPlugins={[[headingRemarkPlugin, false]]}>
                    {markdownText}
                </Component>,
            );

            expect(screen.queryByRole('heading')).not.toBeInTheDocument();
            expect(screen.getByText('зачёркнутый').tagName).toBe('DEL');
        });

        it('should update plugins on rerender without mutating the supplied list', () => {
            const plugins: RemarkPlugins = [headingRemarkPlugin];

            Object.freeze(plugins);
            const { rerender } = render(
                <Component remarkPlugins={plugins}>{markdownText}</Component>,
            );

            expect(
                screen.getByRole('heading', { level: 1, name: 'Заголовок зачёркнутый' }),
            ).toBeInTheDocument();

            rerender(<Component remarkPlugins={[]}>{markdownText}</Component>);

            expect(screen.queryByRole('heading')).not.toBeInTheDocument();
            expect(screen.getByText('зачёркнутый').tagName).toBe('DEL');
            expect(plugins).toEqual([headingRemarkPlugin]);
        });
    });

    describe('transformLinkUri', () => {
        it('should replace unsupported link protocols by default', () => {
            render(<Markdown>[Google](myapp://product/123)</Markdown>);

            const link = screen.getByText('Google').closest('a');

            expect(link).toHaveAttribute('href', 'javascript:void(0)');
        });

        it('should preserve unsupported link protocols when transformation is disabled', () => {
            render(<Markdown transformLinkUri={false}>[Google](myapp://product/123)</Markdown>);

            const link = screen.getByText('Google').closest('a');

            expect(link).toHaveAttribute('href', 'myapp://product/123');
        });

        it('should preserve supported link protocols', () => {
            render(<Markdown>[Google](https://www.google.com/)</Markdown>);

            const link = screen.getByText('Google').closest('a');

            expect(link).toHaveAttribute('href', 'https://www.google.com/');
        });
    });
});

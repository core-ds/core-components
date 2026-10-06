import type * as React from 'react';
import type * as ReactDOMClient from 'react-dom/client';
import type * as ReactDOMServer from 'react-dom/server';

import type * as SpinnerModule from './Component';
import type { SpinnerProps } from './Component';

type SpinnerApplication = {
    container: HTMLDivElement;
    render: (props: SpinnerProps) => void;
    unmount: () => void;
};

const applications: SpinnerApplication[] = [];

const createApplication = (
    props: SpinnerProps,
    html?: string,
    strictMode = false,
): SpinnerApplication => {
    let application: SpinnerApplication | undefined;

    // Отдельный module graph воспроизводит независимые сборки приложений на одной странице.
    jest.isolateModules(() => {
        const react = jest.requireActual<typeof React>('react');
        const reactDOMClient = jest.requireActual<typeof ReactDOMClient>('react-dom/client');
        const { Spinner } = jest.requireActual<typeof SpinnerModule>('./Component');
        const container = document.createElement('div');
        const createSpinner = (nextProps: SpinnerProps) => {
            const spinner = react.createElement(Spinner, nextProps);

            if (strictMode) {
                return react.createElement(react.StrictMode, null, spinner);
            }

            return spinner;
        };

        document.body.appendChild(container);

        let root: ReactDOMClient.Root;

        if (html) {
            container.innerHTML = html;
            react.act(() => {
                root = reactDOMClient.hydrateRoot(container, createSpinner(props));
            });
        } else {
            root = reactDOMClient.createRoot(container);
        }

        application = {
            container,
            render: (nextProps) => {
                react.act(() => root.render(createSpinner(nextProps)));
            },
            unmount: () => {
                react.act(() => root.unmount());
                container.remove();
            },
        };

        application.render(props);
    });

    if (!application) {
        throw new Error('Приложение со Spinner не создано');
    }

    applications.push(application);

    return application;
};

const getMaskId = (container: HTMLElement): string => {
    const mask = container.querySelector('mask');

    if (!mask?.id) {
        throw new Error('Маска Spinner не найдена');
    }

    return mask.id;
};

const expectOwnMask = (container: HTMLElement) => {
    const maskId = getMaskId(container);

    expect(container.querySelector('foreignObject')).toHaveAttribute('mask', `url(#${maskId})`);
    expect(document.getElementById(maskId)).toBe(container.querySelector('mask'));
};

const renderServerSpinner = (props: SpinnerProps): string => {
    let html = '';

    jest.isolateModules(() => {
        const react = jest.requireActual<typeof React>('react');
        const reactDOMServer = jest.requireActual<typeof ReactDOMServer>('react-dom/server.node');
        const { Spinner } = jest.requireActual<typeof SpinnerModule>('./Component');

        html = reactDOMServer.renderToString(react.createElement(Spinner, props));
    });

    return html;
};

afterEach(() => {
    applications.splice(0).forEach((application) => application.unmount());
});

describe('Маски Spinner в независимых React-приложениях', () => {
    it('использует собственную маску для маленького и большого спиннера', () => {
        const small = createApplication({ preset: 16, visible: true });
        const large = createApplication({ preset: 48, visible: true });

        expect(getMaskId(small.container)).not.toBe(getMaskId(large.container));
        expectOwnMask(small.container);
        expectOwnMask(large.container);
    });

    it('различает маски одинакового размера и сохраняет их при изменении пропсов', () => {
        const first = createApplication({ preset: 24, visible: true });
        const second = createApplication({ preset: 24, visible: true });
        const firstMaskId = getMaskId(first.container);
        const secondMaskId = getMaskId(second.container);

        expect(firstMaskId).not.toBe(secondMaskId);

        first.render({ preset: 48, visible: false, colors: 'inverted' });
        second.render({ size: 30, lineWidth: 3, visible: true });

        expect(getMaskId(first.container)).toBe(firstMaskId);
        expect(getMaskId(second.container)).toBe(secondMaskId);
        expectOwnMask(first.container);
        expectOwnMask(second.container);
    });

    it('сохраняет серверные идентификаторы при hydration и повторном рендере', () => {
        const smallProps: SpinnerProps = { preset: 16, visible: true };
        const largeProps: SpinnerProps = { preset: 48, visible: true };
        const smallHtml = renderServerSpinner(smallProps);
        const largeHtml = renderServerSpinner(largeProps);
        const serverContainer = document.createElement('div');

        serverContainer.innerHTML = smallHtml;

        const smallMaskId = getMaskId(serverContainer);

        serverContainer.innerHTML = largeHtml;

        const largeMaskId = getMaskId(serverContainer);
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

        try {
            expect(smallMaskId).not.toBe(largeMaskId);

            const small = createApplication(smallProps, smallHtml);
            const large = createApplication(largeProps, largeHtml);

            expect(getMaskId(small.container)).toBe(smallMaskId);
            expect(getMaskId(large.container)).toBe(largeMaskId);

            small.render({ preset: 24, visible: false });
            large.render({ size: 50, lineWidth: 5, visible: true });

            expect(getMaskId(small.container)).toBe(smallMaskId);
            expect(getMaskId(large.container)).toBe(largeMaskId);
            expectOwnMask(small.container);
            expectOwnMask(large.container);
            expect(consoleError).not.toHaveBeenCalled();
        } finally {
            consoleError.mockRestore();
        }
    });

    it('сохраняет собственные маски при повторном выполнении effects в StrictMode', () => {
        const first = createApplication({ preset: 16, visible: true }, undefined, true);
        const second = createApplication({ preset: 48, visible: true }, undefined, true);
        const firstMaskId = getMaskId(first.container);
        const secondMaskId = getMaskId(second.container);

        expect(firstMaskId).not.toBe(secondMaskId);

        first.render({ preset: 24, visible: false });
        second.render({ preset: 24, visible: true });

        expect(getMaskId(first.container)).toBe(firstMaskId);
        expect(getMaskId(second.container)).toBe(secondMaskId);
        expectOwnMask(first.container);
        expectOwnMask(second.container);
    });
});

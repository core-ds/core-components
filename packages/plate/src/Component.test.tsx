import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';

import userEvent from '@testing-library/user-event';
import { PlateDesktop as Plate, PlateDesktopProps as PlateProps } from './desktop';
import { ButtonDesktop as Button } from '@alfalab/core-components-button/desktop';
import { getPlateTestIds } from './utils';

describe('Plate', () => {
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

    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(
                <Plate view='positive' title='title' leftAddons={<CheckmarkCircleMIcon />}>
                    text
                </Plate>,
            );

            expect(container).toMatchSnapshot();
        });
    });

    it('should forward ref', () => {
        const ref = jest.fn();
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Plate ref={ref} dataTestId={dataTestId} />);

        expect(ref.mock.calls).toEqual([[getByTestId(dataTestId)]]);
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Plate dataTestId={dataTestId} title='Test title' />);

        const testIds = getPlateTestIds(dataTestId);

        expect(getByTestId(testIds.wrapper)).toBeInTheDocument();
        expect(getByTestId(testIds.wrapper).tagName).toBe('DIV');
        expect(getByTestId(testIds.title)).toBeInTheDocument();
    });

    it('should render buttons size=32, first view=secondary, others view=link', () => {
        const size = 32;
        const { queryByTestId } = render(
            <Plate
                buttons={[
                    <Button dataTestId='button-1'>1</Button>,
                    <Button dataTestId='button-2'>2</Button>,
                    <Button dataTestId='button-3'>3</Button>,
                ]}
            />,
        );

        expect(queryByTestId('button-1')).toBeInTheDocument();
        expect(queryByTestId('button-2')).toBeInTheDocument();
        expect(queryByTestId('button-3')).toBeInTheDocument();

        expect(queryByTestId('button-1')).toHaveClass(`size-${size}`);
        expect(queryByTestId('button-2')).toHaveClass(`size-${size}`);
        expect(queryByTestId('button-3')).toHaveClass(`size-${size}`);

        expect(queryByTestId('button-1')).toHaveClass('secondary');
        expect(queryByTestId('button-2')).toHaveClass('link');
        expect(queryByTestId('button-3')).toHaveClass('link');
    });

    it('should set `background` style', () => {
        const background = 'red';
        const { container } = render(<Plate view='custom' background={background} />);

        expect(container.firstElementChild).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });
    });

    it('should set `borderColor` style', () => {
        const borderColor = 'red';
        const { container } = render(<Plate view='custom' borderColor={borderColor} />);

        expect(container.firstElementChild).toHaveStyle({
            'border-color': 'red',
        });
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const className = 'test-class';
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Plate className={className} dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        it('should set `positive` class if `view` prop is `positive`', () => {
            const view = 'positive';
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Plate view={view} dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toHaveClass(view);
        });

        it.each([
            ['rowLimit1', 1],
            ['rowLimit2', 2],
            ['rowLimit3', 3],
        ])(
            'children should have `%s` class if rowLimit prop is `%s`',
            (expectedClassName, rowLimit) => {
                const { getByText } = render(
                    <Plate rowLimit={rowLimit as PlateProps['rowLimit']}>Content</Plate>,
                );

                expect(getByText('Content')).toHaveClass(expectedClassName);
            },
        );

        it('children should not have styles for row limitation', () => {
            const { getByText } = render(<Plate>Content</Plate>);

            expect(getByText('Content').classList[1]).toBeUndefined();
        });
    });

    describe('Folded tests', () => {
        it('should ignore folded and defaultFolded if foldable is false', async () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Plate foldable={false} folded={true} defaultFolded={true} dataTestId={dataTestId}>
                    Content
                </Plate>,
            );

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');
        });

        it('should ignore folded and defaultFolded if title or children are empty', async () => {
            const dataTestId = 'test-id';
            const { getByTestId, rerender } = render(
                <Plate foldable={true} folded={true} defaultFolded={true} dataTestId={dataTestId}>
                    Content
                </Plate>,
            );

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');

            rerender(
                <Plate
                    foldable={true}
                    folded={true}
                    defaultFolded={true}
                    title='title'
                    dataTestId={dataTestId}
                />,
            );

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');
        });

        it('should toggle folded when click on title', async () => {
            const dataTestId = 'test-id';
            const { getByTestId, getByText } = render(
                <Plate foldable={true} defaultFolded={false} title='title' dataTestId={dataTestId}>
                    Content
                </Plate>,
            );

            fireEvent.click(getByText('title'));

            expect(getByTestId(dataTestId)).toHaveClass('isFolded');

            fireEvent.click(getByText('title'));

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');
        });

        it('should toggle folded when click on folder', async () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Plate foldable={true} defaultFolded={false} title='title' dataTestId={dataTestId}>
                    Content
                </Plate>,
            );

            const folderEl = getByTestId(dataTestId).querySelector('.folder') as HTMLElement;

            fireEvent.click(folderEl);

            expect(getByTestId(dataTestId)).toHaveClass('isFolded');

            fireEvent.click(folderEl);

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');
        });

        it('should not toggle folded when click or keypress inside content', async () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Plate foldable={true} defaultFolded={false} title='title' dataTestId={dataTestId}>
                    <input data-test-id='input' />
                </Plate>,
            );

            const input = getByTestId('input') as HTMLElement;

            fireEvent.click(input);

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');

            await userEvent.type(input, '{space}');

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');

            await userEvent.type(input, '{enter}');

            expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');
        });

        describe('when controlled', () => {
            it('should be folded/unfolded when folded prop passed', async () => {
                const dataTestId = 'test-id';
                const { getByTestId, rerender } = render(
                    <Plate foldable={true} folded={true} title='title' dataTestId={dataTestId}>
                        Content
                    </Plate>,
                );

                expect(getByTestId(dataTestId)).toHaveClass('isFolded');

                rerender(
                    <Plate foldable={true} folded={false} title='title' dataTestId={dataTestId}>
                        Content
                    </Plate>,
                );

                expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');
            });
        });

        describe('when uncontrolled', () => {
            it('should be folded when defaultFolded is true', async () => {
                const dataTestId = 'test-id';
                const { getByTestId } = render(
                    <Plate
                        foldable={true}
                        defaultFolded={true}
                        title='title'
                        dataTestId={dataTestId}
                    >
                        Content
                    </Plate>,
                );

                expect(getByTestId(dataTestId)).toHaveClass('isFolded');
            });

            it('should be unfolded when defaultFolded is false', async () => {
                const dataTestId = 'test-id';
                const { getByTestId } = render(
                    <Plate
                        foldable={true}
                        defaultFolded={false}
                        title='title'
                        dataTestId={dataTestId}
                    >
                        Content
                    </Plate>,
                );

                expect(getByTestId(dataTestId)).not.toHaveClass('isFolded');
            });

            it('should be persist folded state when defaultFolded is changed', async () => {
                const dataTestId = 'test-id';
                const { getByTestId, rerender } = render(
                    <Plate
                        foldable={true}
                        defaultFolded={true}
                        title='title'
                        dataTestId={dataTestId}
                    >
                        Content
                    </Plate>,
                );

                expect(getByTestId(dataTestId)).toHaveClass('isFolded');

                rerender(
                    <Plate
                        foldable={true}
                        defaultFolded={false}
                        title='title'
                        dataTestId={dataTestId}
                    >
                        Content
                    </Plate>,
                );

                expect(getByTestId(dataTestId)).toHaveClass('isFolded');
            });
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onClick` prop', async () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Plate onClick={cb} dataTestId={dataTestId} />);

            const el = getByTestId(dataTestId);

            fireEvent.click(el);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should call `onToggle` prop', async () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Plate foldable={true} onToggle={cb} dataTestId={dataTestId} title='title'>
                    Content
                </Plate>,
            );

            const el = getByTestId(dataTestId);
            const folderEl = el.querySelector('.folder') as Element;

            fireEvent.click(folderEl);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should call `onClose` prop', async () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Plate hasCloser={true} onClose={cb} dataTestId={dataTestId} />,
            );

            const el = getByTestId(dataTestId);
            const closeEl = el.querySelector('[aria-label="закрыть"]') as Element;

            fireEvent.click(closeEl);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should hide, if clicked on closer', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Plate hasCloser={true} dataTestId={dataTestId} />);

            const el = getByTestId(dataTestId);
            const closeEl = el.querySelector('[aria-label="закрыть"]') as Element;

            fireEvent.click(closeEl);

            expect(el).toHaveClass('isHidden');
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Plate />);

        expect(unmount).not.toThrow();
    });
});

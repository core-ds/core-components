import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { FileUploadItem } from '.';
import { FileStatuses } from './types';

export const fileProps = {
    title: 'title',
    subtitle: 'subtitle',
    uploadStatus: 'INITIAL' as FileStatuses,
};

describe('FileUploadItem', () => {
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
            expect(
                render(
                    <FileUploadItem {...fileProps}>
                        <FileUploadItem.LeftAddon />
                        <FileUploadItem.Content />
                        <FileUploadItem.RightAddon />
                    </FileUploadItem>,
                ),
            ).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { queryByTestId } = render(<FileUploadItem dataTestId={dataTestId} />);

        expect(queryByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should set `className` class', () => {
        const className = 'test-class';
        const { container } = render(<FileUploadItem className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should use custom icon', () => {
        const dataTestId = 'test-id';

        const { queryByTestId } = render(
            <FileUploadItem customIcon={() => <div data-test-id={dataTestId} />}>
                <FileUploadItem.LeftAddon />
            </FileUploadItem>,
        );

        expect(queryByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should set class "single" to title', () => {
        const { container } = render(
            <FileUploadItem title='title' uploadStatus='INITIAL'>
                <FileUploadItem.Content />
            </FileUploadItem>,
        );

        const element = container.querySelector('.single');

        expect(element).toBeInTheDocument();
    });

    it('should set title', () => {
        const title = 'title';

        render(
            <FileUploadItem title={title} uploadStatus='INITIAL'>
                <FileUploadItem.Content />
            </FileUploadItem>,
        );

        const element = screen.getByText(title);

        expect(element).toBeInTheDocument();
    });

    describe('Left addon tests', () => {
        it('should set progress class', () => {
            const { container } = render(
                <FileUploadItem {...fileProps} uploadStatus='UPLOADING'>
                    <FileUploadItem.LeftAddon />
                </FileUploadItem>,
            );

            const element = container.querySelector('.progress');

            expect(element).toBeInTheDocument();
        });

        it('should set maskImage style', () => {
            const { container } = render(
                <FileUploadItem {...fileProps} uploadStatus='UPLOADING' progressBar={270}>
                    <FileUploadItem.LeftAddon />
                </FileUploadItem>,
            );

            const element = container.querySelector('.progress');

            expect(element).toHaveStyle('maskImage: conic-gradient(red 270deg, transparent 0)');
        });

        it('should set success class', () => {
            const { container } = render(
                <FileUploadItem {...fileProps} uploadStatus='SUCCESS'>
                    <FileUploadItem.LeftAddon />
                </FileUploadItem>,
            );

            const element = container.querySelector('.success');

            expect(element).toBeInTheDocument();
        });

        it('should set error class', () => {
            const { container } = render(
                <FileUploadItem {...fileProps} uploadStatus='ERROR'>
                    <FileUploadItem.LeftAddon />
                </FileUploadItem>,
            );

            const element = container.querySelector('.error');

            expect(element).toBeInTheDocument();
        });
    });

    describe('Subtitle tests', () => {
        it('should set uploading progress', () => {
            render(
                <FileUploadItem
                    title='title'
                    subtitle='subtitle'
                    uploadStatus='UPLOADING'
                    progressBar={270}
                >
                    <FileUploadItem.Content />
                </FileUploadItem>,
            );

            const element = screen.getByText('Загрузка 75%');

            expect(element).toBeInTheDocument();
        });

        it('should set date', () => {
            const date = '22.01.2018';

            render(
                <FileUploadItem
                    title='title'
                    subtitle='subtitle'
                    uploadStatus='SUCCESS'
                    uploadDate={date}
                >
                    <FileUploadItem.Content />
                </FileUploadItem>,
            );

            const element = screen.getByText(date);

            expect(element).toBeInTheDocument();
        });

        it('should set size', () => {
            render(
                <FileUploadItem
                    title='title'
                    subtitle='subtitle'
                    uploadStatus='SUCCESS'
                    size='2097152' // 2mb
                >
                    <FileUploadItem.Content />
                </FileUploadItem>,
            );

            const element = screen.getByText('2 МБ');

            expect(element).toBeInTheDocument();
        });

        it('should set subtitle', () => {
            const subtitle = 'subtitle';

            render(
                <FileUploadItem title='title' subtitle={subtitle} uploadStatus='INITIAL'>
                    <FileUploadItem.Content />
                </FileUploadItem>,
            );

            const element = screen.getByText(subtitle);

            expect(element).toBeInTheDocument();
        });
    });

    describe('Error tests', () => {
        it('should set default error', () => {
            render(
                <FileUploadItem title='title' subtitle='subtitle' uploadStatus='ERROR'>
                    <FileUploadItem.LeftAddon />
                    <FileUploadItem.Content />
                </FileUploadItem>,
            );

            const element = screen.getByText('Не удалось загрузить файл');

            expect(element).toBeInTheDocument();
        });

        it('should set custom error', () => {
            const error = 'custom error';

            render(
                <FileUploadItem
                    title='title'
                    subtitle='subtitle'
                    uploadStatus='ERROR'
                    error={error}
                >
                    <FileUploadItem.LeftAddon />
                    <FileUploadItem.Content />
                </FileUploadItem>,
            );

            const element = screen.getByText(error);
            expect(element).toBeInTheDocument();
        });

        it('should set custom multi error', () => {
            const error = ['custom error 1', 'custom error 2'];

            render(
                <FileUploadItem
                    title='title'
                    subtitle='subtitle'
                    uploadStatus='ERROR'
                    error={error}
                >
                    <FileUploadItem.LeftAddon />
                    <FileUploadItem.Content />
                </FileUploadItem>,
            );

            const firstError = screen.getByText(error[0]);
            const secondError = screen.getByText(error[1]);

            expect(firstError).toBeInTheDocument();
            expect(secondError).toBeInTheDocument();
        });
    });

    describe('Right addon tests', () => {
        it('should set `delete` element', () => {
            render(
                <FileUploadItem showDelete={true}>
                    <FileUploadItem.RightAddon />
                </FileUploadItem>,
            );

            const element = screen.getByLabelText('удалить');

            expect(element).toBeInTheDocument();
        });

        it('should set `restore` element', () => {
            render(
                <FileUploadItem showRestore={true}>
                    <FileUploadItem.RightAddon />
                </FileUploadItem>,
            );

            const element = screen.getByLabelText('восстановить');

            expect(element).toBeInTheDocument();
        });

        it('should set `download` element', () => {
            render(
                <FileUploadItem showRestore={false} downloadLink='/link'>
                    <FileUploadItem.RightAddon />
                </FileUploadItem>,
            );

            const element = screen.getByLabelText('скачать');

            expect(element).toBeInTheDocument();
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onDelete` prop', () => {
            const cb = jest.fn();
            const fileId = 'id';
            const { getByLabelText } = render(
                <FileUploadItem showDelete={true} onDelete={cb} id={fileId}>
                    <FileUploadItem.RightAddon />
                </FileUploadItem>,
            );

            fireEvent.click(getByLabelText('удалить'));

            expect(cb).toBeCalledTimes(1);
            expect(cb.mock.calls[0][0]).toBe(fileId);
        });

        it('should call `onRestore` prop', () => {
            const cb = jest.fn();
            const fileId = 'id';
            const { getByLabelText } = render(
                <FileUploadItem showRestore={true} onRestore={cb} id={fileId}>
                    <FileUploadItem.RightAddon />
                </FileUploadItem>,
            );

            fireEvent.click(getByLabelText('восстановить'));

            expect(cb).toBeCalledTimes(1);
            expect(cb.mock.calls[0][0]).toBe(fileId);
        });

        it('should call `onDownload` prop', async () => {
            const cb = jest.fn();
            const fileId = 'id';
            const { baseElement } = render(
                <FileUploadItem {...fileProps} downloadLink='/link' onDownload={cb} id={fileId}>
                    <FileUploadItem.RightAddon />
                </FileUploadItem>,
            );

            const downloadButton = baseElement.querySelector('a') as HTMLAnchorElement;

            fireEvent.click(downloadButton);

            expect(cb).toBeCalledTimes(1);
            expect(cb.mock.calls[0][0]).toBe(fileId);
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(
            <FileUploadItem>
                <FileUploadItem.LeftAddon />
                <FileUploadItem.Content />
                <FileUploadItem.RightAddon />
            </FileUploadItem>,
        );

        expect(unmount).not.toThrowError();
    });
});

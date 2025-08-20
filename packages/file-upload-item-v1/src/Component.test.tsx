import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { FileUploadItemV1, FileStatuses } from '.';

export const fileProps = {
    name: 'Довольно длинное название файла.pdf',
    uploadDate: '22.01.2018',
    size: 45000,
    downloadLink: '/link',
    download: 'новое_название_файла',
    uploadStatus: 'SUCCESS' as FileStatuses,
    showDelete: true,
};

describe('FileUploadItemV1', () => {
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
            expect(render(<FileUploadItemV1 {...fileProps} />)).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { queryByTestId } = render(<FileUploadItemV1 dataTestId={dataTestId} />);

        expect(queryByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should set `className` class', () => {
        const className = 'test-class';
        const { container } = render(<FileUploadItemV1 className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set `className` class', () => {
        const className = 'test-class';
        const { container } = render(<FileUploadItemV1 className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should use custom icon', () => {
        const dataTestId = 'test-id';
        const { queryByTestId } = render(
            <FileUploadItemV1 icon={() => <div data-test-id={dataTestId} />} />,
        );

        expect(queryByTestId(dataTestId)).toBeInTheDocument();
    });

    describe('Callbacks tests', () => {
        it('should call `onDelete` prop', () => {
            const cb = jest.fn();
            const fileId = 'id';
            const { getByLabelText } = render(
                <FileUploadItemV1 showDelete={true} onDelete={cb} id={fileId} />,
            );

            fireEvent.click(getByLabelText('удалить'));

            expect(cb).toHaveBeenCalledTimes(1);
            expect(cb.mock.calls[0][0]).toBe(fileId);
        });

        it('should call `onRestore` prop', () => {
            const cb = jest.fn();
            const fileId = 'id';
            const { getByText } = render(
                <FileUploadItemV1 showRestore={true} onRestore={cb} id={fileId} />,
            );

            fireEvent.click(getByText('Восстановить'));

            expect(cb).toHaveBeenCalledTimes(1);
            expect(cb.mock.calls[0][0]).toBe(fileId);
        });

        it('should call `onDownload` prop', async () => {
            const cb = jest.fn();
            const fileId = 'id';
            const { baseElement } = render(
                <FileUploadItemV1
                    {...fileProps}
                    downloadLink='/link'
                    onDownload={cb}
                    id={fileId}
                />,
            );

            const downloadButton = baseElement.querySelector('a') as HTMLAnchorElement;

            fireEvent.click(downloadButton);

            expect(cb).toHaveBeenCalledTimes(1);
            expect(cb.mock.calls[0][0]).toBe(fileId);
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<FileUploadItemV1 />);

        expect(unmount).not.toThrow();
    });
});

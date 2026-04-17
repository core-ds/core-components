import React from 'react';
import { render, screen } from '@testing-library/react';

import { FileUploadItemContext } from '../../../context/file-upload-item-context';

import { ExtensionIcon } from '.';

jest.mock('@alfalab/icons-glyph/DocumentImageOffMIcon', () => ({
    DocumentImageOffMIcon: () => <div data-test-id='broken-image-icon' />,
}));

describe('ExtensionIcon', () => {
    it('should hide icon when image is valid', () => {
        const CustomIcon = () => <div data-test-id='custom-icon' />;

        render(
            <FileUploadItemContext.Provider
                value={{
                    imageUrl: 'https://test-image',
                    isBrokenImage: false,
                    customIcon: CustomIcon,
                }}
            >
                <ExtensionIcon />
            </FileUploadItemContext.Provider>,
        );

        expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
    });

    it('should show fallback icon when image is broken', () => {
        render(
            <FileUploadItemContext.Provider
                value={{
                    imageUrl: 'https://broken-image',
                    isBrokenImage: true,
                }}
            >
                <ExtensionIcon />
            </FileUploadItemContext.Provider>,
        );

        expect(screen.getByTestId('broken-image-icon')).toBeInTheDocument();
    });

    it('should keep custom icon priority for broken image', () => {
        const CustomIcon = () => <div data-test-id='custom-icon' />;

        render(
            <FileUploadItemContext.Provider
                value={{
                    imageUrl: 'https://broken-image',
                    isBrokenImage: true,
                    customIcon: CustomIcon,
                }}
            >
                <ExtensionIcon />
            </FileUploadItemContext.Provider>,
        );

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
});

// import React from 'react';
// import { SidePanelDesktop, SidePanelDesktopProps } from './desktop';
// import { SidePanelMobile, SidePanelMobileProps } from './mobile';
// import { render, screen } from '@testing-library/react';
// import { getSidePanelTestIds } from './utils';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('test', () => {
    it('test', () => {});
});

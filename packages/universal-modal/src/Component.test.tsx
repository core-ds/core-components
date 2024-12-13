import React from 'react';
import { render, screen } from '@testing-library/react';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { getUniversalModalTestIds } from './utils';
import { UniversalModalResponsive } from './Component.responsive';

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

Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
    value: jest.fn(),
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

describe('UniversalModal', () => {
    it('UniversalModalDesktop snapshot', () => {
        render(
            <UniversalModalDesktop open={true}>
                <UniversalModalDesktop.Header title='Title' />
                <UniversalModalDesktop.Content>Content</UniversalModalDesktop.Content>
                <UniversalModalDesktop.Footer>Footer</UniversalModalDesktop.Footer>
            </UniversalModalDesktop>,
        );
        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });

    it('UniversalModalMobile snapshot', () => {
        render(
            <UniversalModalMobile open={true}>
                <UniversalModalMobile.Header title='Title' />
                <UniversalModalMobile.Content>Content</UniversalModalMobile.Content>
                <UniversalModalMobile.Footer>Footer</UniversalModalMobile.Footer>
            </UniversalModalMobile>,
        );
        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });

    it('UniversalModalResponsive snapshot', () => {
        render(
            <UniversalModalResponsive open={true}>
                <UniversalModalResponsive.Header title='Title' />
                <UniversalModalResponsive.Content>Content</UniversalModalResponsive.Content>
                <UniversalModalResponsive.Footer>Footer</UniversalModalResponsive.Footer>
            </UniversalModalResponsive>,
        );
        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });

    it('should have data-test-id', () => {
        const dti = 'modal-dti';
        const { getByTestId } = render(
            <UniversalModalResponsive dataTestId={dti} open={true}>
                <UniversalModalResponsive.Header
                    title='Title'
                    dataTestId={getUniversalModalTestIds(dti).header}
                />
                <UniversalModalResponsive.Content
                    dataTestId={getUniversalModalTestIds(dti).content}
                >
                    Content
                </UniversalModalResponsive.Content>
                <UniversalModalResponsive.Footer>Footer</UniversalModalResponsive.Footer>
            </UniversalModalResponsive>,
        );

        const testIds = getUniversalModalTestIds(dti);

        expect(getByTestId(testIds.modal)).toBeInTheDocument();
        expect(getByTestId(testIds.header)).toBeInTheDocument();
        expect(getByTestId(testIds.title)).toBeInTheDocument();
        expect(getByTestId(testIds.content)).toBeInTheDocument();
        expect(getByTestId(testIds.footer)).toBeInTheDocument();
    });

    describe('desktop position test', () => {
        it('position horizontal=center vertical=center', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'center'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'margin: auto;',
            );
        });

        it('position horizontal=center vertical=top', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'top'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'margin: 0 auto auto auto;',
            );
        });

        it('position horizontal=center vertical=bottom', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'bottom'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'margin: auto auto 0 auto;',
            );
        });

        it('position horizontal=start vertical=center', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'start'}
                    verticalAlign={'center'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 0');
        });

        it('position horizontal=start vertical=top', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'start'}
                    verticalAlign={'top'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 0');
        });

        it('position horizontal=start vertical=bottom', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'start'}
                    verticalAlign={'bottom'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 0');
        });

        it('position horizontal=end vertical=center', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'end'}
                    verticalAlign={'center'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 0');
        });

        it('position horizontal=end vertical=top', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'end'}
                    verticalAlign={'top'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 0');
        });

        it('position horizontal=end vertical=bottom', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'end'}
                    verticalAlign={'bottom'}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 0');
        });
    });

    describe('desktop position with margin test', () => {
        it('position horizontal=center vertical=center', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'center'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'margin: 12px;',
            );
        });

        it('position horizontal=center vertical=top', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'top'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'margin: 12px;',
            );
        });

        it('position horizontal=center vertical=bottom', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'bottom'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'margin: 12px;',
            );
        });

        it('position horizontal=start vertical=center', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'start'}
                    verticalAlign={'center'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 12px');
        });

        it('position horizontal=start vertical=top', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'start'}
                    verticalAlign={'top'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 12px');
        });

        it('position horizontal=start vertical=bottom', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'start'}
                    verticalAlign={'bottom'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 12px');
        });

        it('position horizontal=end vertical=center', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'end'}
                    verticalAlign={'center'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 12px');
        });

        it('position horizontal=end vertical=top', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'end'}
                    verticalAlign={'top'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 12px');
        });

        it('position horizontal=end vertical=bottom', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'end'}
                    verticalAlign={'bottom'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle('margin: 12px');
        });
    });

    describe('desktop full height and width', () => {
        it('should calculate width with margin', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'center'}
                    width={'fullWidth'}
                    height={'fullHeight'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'width: calc(100% - 12px - 12px)',
            );
        });

        it('should calculate height with margin', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop
                    dataTestId={dti}
                    open={true}
                    horizontalAlign={'center'}
                    verticalAlign={'center'}
                    width={'fullWidth'}
                    height={'fullHeight'}
                    margin={[12]}
                />,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal).firstElementChild).toHaveStyle(
                'height: calc(100% - 12px - 12px)',
            );
        });
    });
});

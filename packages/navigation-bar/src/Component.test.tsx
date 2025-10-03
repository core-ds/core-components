import React from 'react';
import { render } from '@testing-library/react';
import { NavigationBar, NavigationBarProps } from './Component';
import { getNavigationBarTestIds } from './utils';

const dti = 'nb-dti';

const NavigationBarWrapper = (props: Partial<NavigationBarProps>) => {
    return <NavigationBar dataTestId={dti} title='Title' subtitle='subtitle' {...props} />;
};

describe('NavigationBar', () => {
    describe('Snapshots tests', () => {
        it('should match default snapshot', () => {
            expect(
                render(
                    <NavigationBar
                        dataTestId={dti}
                        title='Title'
                        subtitle='subtitle'
                        leftAddons={<span>Left</span>}
                        rightAddons={<span>Right</span>}
                        bottomAddons={<span>bottom</span>}
                    />,
                ),
            ).toMatchSnapshot();
        });
    });

    describe('Attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const { getByTestId } = render(<NavigationBarWrapper />);

            const testIds = getNavigationBarTestIds(dti);

            expect(getByTestId(testIds.navigationBar)).toBeInTheDocument();
            expect(getByTestId(testIds.title)).toBeInTheDocument();
            expect(getByTestId(testIds.subtitle)).toBeInTheDocument();
            expect(getByTestId(dti).tagName).toBe('DIV');
        });
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const className = 'test-class';
            const { getByTestId } = render(<NavigationBarWrapper className={className} />);

            expect(getByTestId(dti)).toHaveClass(className);
        });

        it('should set custom backgroundColor', () => {
            const backgroundColor = '#fff';
            const { container } = render(
                <NavigationBarWrapper backgroundColor={backgroundColor} />,
            );

            expect(container.firstChild).toHaveStyle('background-color: #fff');
        });

        it('should set `border` class', () => {
            const { getByTestId } = render(<NavigationBarWrapper border={true} />);

            expect(getByTestId(dti)).toHaveClass('border');
        });

        it('should set `sticky` class', () => {
            const { getByTestId } = render(<NavigationBarWrapper sticky={true} />);

            expect(getByTestId(dti)).toHaveClass('sticky');
        });

        it('should set `align` default class', () => {
            const { container } = render(<NavigationBarWrapper />);

            const wrapper = container.firstChild;
            expect(wrapper?.firstChild).toHaveClass('center');
        });

        it('should set `align = left` default class', () => {
            const { container } = render(<NavigationBarWrapper align='left' />);

            const wrapper = container.firstChild;
            expect(wrapper?.firstChild).toHaveClass('left');
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<NavigationBarWrapper />);

        expect(unmount).not.toThrow();
    });
});

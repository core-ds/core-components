import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { PureCell } from './component';

describe('PureCell', () => {
    it('should use `direction` prop', () => {
        render(
            <PureCell direction='vertical' dataTestId='cell-pure'>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass('vertical');
    });

    it('should use `className` prop', () => {
        const className = 'testClassName';

        render(
            <PureCell className={className} dataTestId='cell-pure'>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass(className);
    });

    it('should use `dataTestId` prop', () => {
        const dataTestId = 'cell-pure';

        render(
            <PureCell dataTestId={dataTestId}>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toBeInTheDocument();
    });

    it('should use `Component` prop', () => {
        render(
            <PureCell tag='div' dataTestId='cell-pure'>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure').tagName).toBe('DIV');
    });

    it('should render `a` if it has `href` prop', () => {
        render(
            <PureCell href='www.www.ww' dataTestId='cell-pure'>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure').tagName).toBe('A');
    });

    it('should use `verticalPadding` prop', () => {
        render(
            <PureCell verticalPadding='airy' dataTestId='cell-pure'>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass('airy');
    });

    it('should use `horizontalPadding` prop', () => {
        render(
            <PureCell horizontalPadding='both' dataTestId='cell-pure'>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass('both');
    });

    it('should render `button` if it has `onClick` prop', () => {
        const cb = jest.fn();

        render(
            <PureCell onClick={cb} dataTestId='cell-pure'>
                <PureCell.Graphics>
                    <StarMIcon />
                </PureCell.Graphics>
                <PureCell.Content>
                    <PureCell.Main>
                        <PureCell.Text titleColor='primary' view='component-primary'>
                            Title
                        </PureCell.Text>
                        <PureCell.Text titleColor='secondary' view='primary-small'>
                            Label
                        </PureCell.Text>
                    </PureCell.Main>
                </PureCell.Content>
            </PureCell>,
        );

        fireEvent.click(screen.getByTestId('cell-pure'));

        expect(cb).toBeCalledTimes(1);
        expect(screen.getByTestId('cell-pure').tagName).toBe('BUTTON');
    });

    describe('PureCell.Text', () => {
        it('should wrap children into Typography', function () {
            const pureCellTextDti = 'pure-cell';
            const linkDti = 'link';

            const { getByTestId } = render(
                <PureCell>
                    <PureCell.Text
                        titleColor='primary'
                        view='component-primary'
                        dataTestId={pureCellTextDti}
                    >
                        <a data-test-id={linkDti}>Text</a>
                    </PureCell.Text>
                </PureCell>,
            );

            const link = getByTestId(linkDti);
            const textTypography = getByTestId(`${pureCellTextDti}-text_content`);

            expect(textTypography).toHaveClass('component-primary primary');
            expect(link.parentElement).toBe(textTypography);
        });

        it('should wrap value into Typography', function () {
            const pureCellTextDti = 'pure-cell';
            const linkDti = 'link';

            const { getByTestId } = render(
                <PureCell>
                    <PureCell.Text
                        titleColor='primary'
                        view='component-primary'
                        valueColor='link'
                        dataTestId={pureCellTextDti}
                        value={<a data-test-id={linkDti}>Text</a>}
                    >
                        Text
                    </PureCell.Text>
                </PureCell>,
            );

            const link = getByTestId(linkDti);
            const valueTypography = getByTestId(`${pureCellTextDti}-text_value`);

            expect(valueTypography).toHaveClass('component-primary link');
            expect(link.parentElement).toBe(valueTypography);
        });
    });
});

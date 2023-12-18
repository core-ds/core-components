import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { PureCell, PureCellProps } from './component';
import { getPureCellTestIds } from './utils';

const PureCellWrapper = (props: Partial<PureCellProps>) => {
    return (
        <PureCell {...props}>
            <PureCell.Graphics>
                <StarMIcon />
            </PureCell.Graphics>
            <PureCell.Content>
                <PureCell.Main>
                    <PureCell.Text value='value' titleColor='primary'>
                        Title
                    </PureCell.Text>
                </PureCell.Main>
                <PureCell.Addon>
                    <StarMIcon />
                </PureCell.Addon>
                <PureCell.Amount value={1234} />
                <PureCell.AmountTitle value={1234} />
                <PureCell.Category
                    rightAddons={<div />}
                    categoryName='Category'
                    categoryPercent={10}
                />
                <PureCell.Footer>
                    <PureCell.Comment>Comment</PureCell.Comment>
                </PureCell.Footer>
                <PureCell.FooterButton />
                <PureCell.ExtraSubtitle />
            </PureCell.Content>
        </PureCell>
    );
};

describe('PureCell', () => {
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
        const dti = 'pure-cell-dti';
        const { getByTestId } = render(<PureCellWrapper dataTestId={dti} />);

        const testIds = getPureCellTestIds(dti);

        expect(getByTestId(testIds.pureCell)).toBeInTheDocument();
        expect(getByTestId(testIds.addon)).toBeInTheDocument();
        expect(getByTestId(testIds.amount)).toBeInTheDocument();
        expect(getByTestId(testIds.amountText)).toBeInTheDocument();
        expect(getByTestId(testIds.amountTitle)).toBeInTheDocument();
        expect(getByTestId(testIds.coreAmountTitle)).toBeInTheDocument();
        expect(getByTestId(testIds.categoryName)).toBeInTheDocument();
        expect(getByTestId(testIds.categoryPercent)).toBeInTheDocument();
        expect(getByTestId(testIds.categoryRightAddon)).toBeInTheDocument();
        expect(getByTestId(testIds.content)).toBeInTheDocument();
        expect(getByTestId(testIds.footer)).toBeInTheDocument();
        expect(getByTestId(testIds.footerButton)).toBeInTheDocument();
        expect(getByTestId(testIds.extraSubtitle)).toBeInTheDocument();
        expect(getByTestId(testIds.graphics)).toBeInTheDocument();
        expect(getByTestId(testIds.main)).toBeInTheDocument();
        expect(getByTestId(testIds.textContent)).toBeInTheDocument();
        expect(getByTestId(testIds.textValue)).toBeInTheDocument();
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

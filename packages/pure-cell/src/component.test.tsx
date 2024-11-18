import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import {
    PureCellComponent as PureCell,
    Graphics,
    Content,
    Main,
    Text,
    Addon,
    Amount,
    AmountTitle,
    Category,
    Footer,
    Comment,
    FooterButton,
    ExtraSubtitle,
    type PureCellProps,
} from './component';

import { getPureCellTestIds } from './utils';

const PureCellWrapper = (props: Partial<PureCellProps>) => {
    return (
        <PureCell {...props}>
            <Graphics>
                <StarMIcon />
            </Graphics>
            <Content>
                <Main>
                    <Text value='value' titleColor='primary'>
                        Title
                    </Text>
                </Main>
                <Addon>
                    <StarMIcon />
                </Addon>
                <Amount value={1234} />
                <AmountTitle value={1234} />
                <Category rightAddons={<div />} categoryName='Category' categoryPercent={10} />
                <Footer>
                    <Comment>Comment</Comment>
                </Footer>
                <FooterButton />
                <ExtraSubtitle />
            </Content>
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
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass('vertical');
    });

    it('should use `className` prop', () => {
        const className = 'testClassName';

        render(
            <PureCell className={className} dataTestId='cell-pure'>
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
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
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure').tagName).toBe('DIV');
    });

    it('should render `a` if it has `href` prop', () => {
        render(
            <PureCell href='www.www.ww' dataTestId='cell-pure'>
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure').tagName).toBe('A');
    });

    it('should use `verticalPadding` prop', () => {
        render(
            <PureCell verticalPadding='airy' dataTestId='cell-pure'>
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass('airy');
    });

    it('should use `verticalTopPadding` and `verticalBottomPadding` prop', () => {
        render(
            <PureCell verticalPadding={{ top: 'airy', bottom: 'tiny' }} dataTestId='cell-pure'>
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass('airyTop');
        expect(screen.getByTestId('cell-pure')).toHaveClass('tinyBottom');
    });

    it('should use `horizontalPadding` prop', () => {
        render(
            <PureCell horizontalPadding='both' dataTestId='cell-pure'>
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
            </PureCell>,
        );

        expect(screen.getByTestId('cell-pure')).toHaveClass('both');
    });

    it('should render `button` if it has `onClick` prop', () => {
        const cb = jest.fn();

        render(
            <PureCell onClick={cb} dataTestId='cell-pure'>
                <Graphics>
                    <StarMIcon />
                </Graphics>
                <Content>
                    <Main>
                        <Text titleColor='primary' view='component-primary'>
                            Title
                        </Text>
                        <Text titleColor='secondary' view='primary-small'>
                            Label
                        </Text>
                    </Main>
                </Content>
            </PureCell>,
        );

        fireEvent.click(screen.getByTestId('cell-pure'));

        expect(cb).toBeCalledTimes(1);
        expect(screen.getByTestId('cell-pure').tagName).toBe('BUTTON');
    });

    describe('Text', () => {
        it('should wrap children into Typography', function () {
            const pureCellTextDti = 'pure-cell';
            const linkDti = 'link';

            const { getByTestId } = render(
                <PureCell>
                    <Text
                        titleColor='primary'
                        view='component-primary'
                        dataTestId={pureCellTextDti}
                    >
                        <a data-test-id={linkDti}>Text</a>
                    </Text>
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
                    <Text
                        titleColor='primary'
                        view='component-primary'
                        valueColor='link'
                        dataTestId={pureCellTextDti}
                        value={<a data-test-id={linkDti}>Text</a>}
                    >
                        Text
                    </Text>
                </PureCell>,
            );

            const link = getByTestId(linkDti);
            const valueTypography = getByTestId(`${pureCellTextDti}-text_value`);

            expect(valueTypography).toHaveClass('component-primary link');
            expect(link.parentElement).toBe(valueTypography);
        });
    });

    describe('Main', () => {
        it('should call cb function if it has `onClick` prop ', () => {
            const cb = jest.fn();
            const cellCb = jest.fn();

            render(
                <PureCell onClick={cellCb}>
                    <Graphics dataTestId='cell-pure' onClick={cb}>
                        <StarMIcon />
                    </Graphics>
                </PureCell>,
            );

            fireEvent.click(screen.getByTestId('cell-pure-graphics'));

            expect(cb).toBeCalledTimes(1);
            expect(cellCb).toBeCalledTimes(0);
            expect(screen.getByTestId('cell-pure-graphics').tagName).toBe('BUTTON');
        });
    });

    describe('Graphics', () => {
        it('should call cb function if it has `onClick` prop ', () => {
            const cb = jest.fn();
            const cellCb = jest.fn();

            render(
                <PureCell onClick={cellCb}>
                    <Content>
                        <Main dataTestId='cell-pure' onClick={cb}>
                            <Text titleColor='primary' view='component-primary'>
                                Title
                            </Text>
                            <Text titleColor='secondary' view='primary-small'>
                                Label
                            </Text>
                        </Main>
                    </Content>
                </PureCell>,
            );

            fireEvent.click(screen.getByTestId('cell-pure-main'));

            expect(cb).toBeCalledTimes(1);
            expect(cellCb).toBeCalledTimes(0);
            expect(screen.getByTestId('cell-pure-main').tagName).toBe('BUTTON');
        });
    });

    describe('Addon', () => {
        it('should call cb function if it has `onClick` prop ', () => {
            const cb = jest.fn();
            const cellCb = jest.fn();

            render(
                <PureCell onClick={cellCb}>
                    <Content>
                        <Addon dataTestId='cell-pure' onClick={cb}>
                            <StarMIcon />
                        </Addon>
                    </Content>
                </PureCell>,
            );

            fireEvent.click(screen.getByTestId('cell-pure-addon'));

            expect(cb).toBeCalledTimes(1);
            expect(cellCb).toBeCalledTimes(0);
            expect(screen.getByTestId('cell-pure-addon').tagName).toBe('BUTTON');
        });
    });

    describe('FooterButton', () => {
        it('should call cb function if it has `onClick` prop ', () => {
            const cb = jest.fn();
            const cellCb = jest.fn();

            render(
                <PureCell onClick={cellCb}>
                    <Content>
                        <Footer>
                            <FooterButton dataTestId='cell-pure' onClick={cb}>
                                Button
                            </FooterButton>
                        </Footer>
                    </Content>
                </PureCell>,
            );

            fireEvent.click(screen.getByTestId('cell-pure-button'));

            expect(cb).toBeCalledTimes(1);
            expect(cellCb).toBeCalledTimes(0);
            expect(screen.getByTestId('cell-pure-button').tagName).toBe('BUTTON');
        });
    });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DiamondsXxlIcon } from '@alfalab/icons-glyph/DiamondsXxlIcon';
import { getProductCoverSingleTestIds, getProductCoverStackTestIds } from './utils';
import { ProductCover } from './index';

describe('ProductCover', () => {
    describe('Snapshots tests', () => {
        it('should match snapshots', () => {
            expect(
                render(
                    <ProductCover.Single
                        cardNumber={1234000000001234}
                        cardholderName='Cardholder Name'
                        baseUrl='https://online.alfabank.ru/cards-images/cards/'
                        layers='BACKGROUND,LOGO,PAYMENT_SYSTEM'
                        cardId='RM'
                    />,
                ).container,
            ).toMatchSnapshot();
        });

        it('should set `data-test-id` attribute to wrapper', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<ProductCover.Single dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId).tagName).toBe('DIV');
        });

        it('should set `data-test-id` attribute in ProductCoverSingle', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <ProductCover.Single
                    cardNumber={1234000000001234}
                    cardholderName='Cardholder Name'
                    eyeButton
                    dataTestId={dataTestId}
                />,
            );

            const testIds = getProductCoverSingleTestIds(dataTestId);
            expect(getByTestId(testIds.productCoverSingle)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfo)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfoEye)).toBeInTheDocument();
        });

        it('should set `data-test-id` attribute in ProductCoverStack', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <ProductCover.Stack
                    firstCard={{
                        cardNumber: 1234000000001234,
                        cardholderName: 'Cardholder Name',
                        eyeButton: true,
                    }}
                    secondCard={{
                        cardNumber: 1234000000001234,
                    }}
                    numberOfСards={2}
                    dataTestId={dataTestId}
                />,
            );

            const testIds = getProductCoverStackTestIds(dataTestId);

            expect(getByTestId(testIds.productCoverStack)).toBeInTheDocument();
            expect(getByTestId(testIds.secondCard)).toBeInTheDocument();
            expect(getByTestId(testIds.firstCard)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfoFirstCard)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfoSecondCard)).toBeInTheDocument();
        });

        it('should set Cardholder Name', () => {
            const label = 'Cardholder Name';
            const { container } = render(<ProductCover.Single cardholderName={label} />);

            expect(container).toHaveTextContent(label);
        });

        it('should set size', () => {
            const { container } = render(<ProductCover.Single size={164} />);

            expect(container.querySelector('.component')).toHaveStyle({
                width: '264px',
                height: '164px',
            });
        });

        it('should set boxShadow', () => {
            const testShadow = '2px 2px 2px 0px rgba(0, 0, 0, 0.20)';
            const { container } = render(<ProductCover.Single shadow={testShadow} />);

            expect(container.querySelector('.component')).toHaveStyle({
                boxShadow: testShadow,
            });
        });

        it('should set backgroundColor', () => {
            const { container } = render(<ProductCover.Single backgroundColor='#fff' />);

            expect(container.querySelector('.component')).toHaveStyle({
                backgroundColor: '#fff',
            });
        });

        it('should set border', () => {
            const { container } = render(<ProductCover.Single borderColor='red' />);

            expect(container.querySelector('.border')).toHaveStyle({
                boxShadow: 'inset 0 0 0 1px red',
            });
        });

        it('displays the ProductCover component with a button to show card number', () => {
            render(
                <ProductCover.Single cardNumber={1234000000001234} eyeButton dataTestId='card' />,
            );

            const eyeButtonElement = screen.getByTestId('card-user-info-eye-btn');

            expect(eyeButtonElement).toBeInTheDocument();
        });

        it('clicking on eyeButton should not trigger onEyeIconClick if onEyeIconClick is not provided', () => {
            const onEyeIconClick = jest.fn();
            render(
                <ProductCover.Single cardNumber={1234000000001234} eyeButton dataTestId='card' />,
            );

            const eyeButtonElement = screen.getByTestId('card-user-info-eye-btn');

            fireEvent.click(eyeButtonElement);

            expect(onEyeIconClick).not.toHaveBeenCalled();
        });

        it('clicking on eyeButton should trigger onEyeIconClick if onEyeIconClick is provided', () => {
            const onEyeIconClick = jest.fn();
            render(
                <ProductCover.Single
                    onEyeIconClick={onEyeIconClick}
                    cardNumber={1234000000001234}
                    eyeButton
                    dataTestId='card'
                />,
            );

            const eyeButtonElement = screen.getByTestId('card-user-info-eye-btn');

            fireEvent.click(eyeButtonElement);

            expect(onEyeIconClick).toHaveBeenCalledTimes(1);
        });

        it('renders ProductCover component with image', () => {
            render(
                <ProductCover.Single
                    baseUrl='https://online.alfabank.ru/cards-images/cards/'
                    layers='BACKGROUND,LOGO,PAYMENT_SYSTEM'
                    cardId='RM'
                />,
            );

            const imageElement = screen.getByAltText('card');
            expect(imageElement).toBeInTheDocument();
        });

        it('does not render user info when the size of the card is small', () => {
            render(
                <ProductCover.Single
                    size={16}
                    cardholderName='Cardholder Name'
                    dataTestId='card'
                />,
            );

            const userInfo = screen.queryByTestId('card-user-info');
            expect(userInfo).not.toBeInTheDocument();
        });

        it('renders ProductCover component with overlay', () => {
            const { container } = render(<ProductCover.Single icon={DiamondsXxlIcon} />);

            const statusIcon = container.querySelector('.overlay');
            expect(statusIcon).toBeInTheDocument();
        });

        it('renders ProductCover component with contentAddons', () => {
            const { container } = render(
                <ProductCover.Single
                    contentAddons={<div />}
                    cardholderName='Cardholder Name'
                    dataTestId='card'
                />,
            );

            const contentAddons = container.querySelector('.contentAddons');
            const userInfo = screen.queryByTestId('card-user-info');
            expect(userInfo).not.toBeInTheDocument();
            expect(contentAddons).toBeInTheDocument();
        });

        it('should unmount without errors', () => {
            const { unmount } = render(<ProductCover.Single />);

            expect(unmount).not.toThrowError();
        });
    });
});

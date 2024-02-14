import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DiamondsXxlIcon } from '@alfalab/icons-glyph/DiamondsXxlIcon';
import { getBankСardViewImageTestIds, getBankСardViewStackTestIds } from './utils';
import { BankСardView } from './index';

describe('BankСardView', () => {
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
        it('should match snapshots', () => {
            expect(
                render(
                    <BankСardView.Image
                        maskedCardNumber={1234000000001234}
                        cardholderName='Cardholder Name'
                        imageUrl='https://online.alfabank.ru/cards-images/cards/'
                        layers='BACKGROUND,LOGO,PAYMENT_SYSTEM'
                        cardId='RM'
                    />,
                ).container,
            ).toMatchSnapshot();
        });

        it('should set `data-test-id` attribute to wrapper', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<BankСardView.Image dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId).tagName).toBe('DIV');
        });

        it('should set `data-test-id` attribute in BankСardViewImage', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <BankСardView.Image
                    maskedCardNumber={1234000000001234}
                    cardholderName='Cardholder Name'
                    eyeButton
                    dataTestId={dataTestId}
                />,
            );

            const testIds = getBankСardViewImageTestIds(dataTestId);
            expect(getByTestId(testIds.bankСardViewImage)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfo)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfoEye)).toBeInTheDocument();
        });

        it('should set `data-test-id` attribute in BankСardViewStack', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <BankСardView.Stack
                    firstCard={{
                        maskedCardNumber: 1234000000001234,
                        cardholderName: 'Cardholder Name',
                        eyeButton: true,
                    }}
                    secondCard={{
                        maskedCardNumber: 1234000000001234,
                    }}
                    numberOfСards={2}
                    dataTestId={dataTestId}
                />,
            );

            const testIds = getBankСardViewStackTestIds(dataTestId);

            expect(getByTestId(testIds.bankСardViewStack)).toBeInTheDocument();
            expect(getByTestId(testIds.secondCard)).toBeInTheDocument();
            expect(getByTestId(testIds.firstCard)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfoFirstCard)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfoSecondCard)).toBeInTheDocument();
            expect(getByTestId(testIds.userInfoEye)).toBeInTheDocument();
        });

        it('should set Cardholder Name', () => {
            const label = 'Cardholder Name';
            const { container } = render(<BankСardView.Image cardholderName={label} />);

            expect(container).toHaveTextContent(label);
        });

        it('should set size', () => {
            const { container } = render(<BankСardView.Image size={[164, 264]} />);

            expect(container.querySelector('.component')).toHaveStyle({
                width: '264px',
                height: '164px',
            });
        });

        it('displays the BankСardView component with a button to show card number', () => {
            render(
                <BankСardView.Image
                    maskedCardNumber={1234000000001234}
                    eyeButton
                    dataTestId='card'
                />,
            );

            const eyeButtonElement = screen.getByTestId('card-user-info-eye-btn');

            expect(eyeButtonElement).toBeInTheDocument();
        });

        it('clicking on eyeButton should not trigger onEyeIconClick if onEyeIconClick is not provided', () => {
            const onEyeIconClick = jest.fn();
            render(
                <BankСardView.Image
                    maskedCardNumber={1234000000001234}
                    eyeButton
                    dataTestId='card'
                />,
            );

            const eyeButtonElement = screen.getByTestId('card-user-info-eye-btn');

            fireEvent.click(eyeButtonElement);

            expect(onEyeIconClick).not.toHaveBeenCalled();
        });

        it('clicking on eyeButton should trigger onEyeIconClick if onEyeIconClick is provided', () => {
            const onEyeIconClick = jest.fn();
            render(
                <BankСardView.Image
                    onEyeIconClick={onEyeIconClick}
                    maskedCardNumber={1234000000001234}
                    eyeButton
                    dataTestId='card'
                />,
            );

            const eyeButtonElement = screen.getByTestId('card-user-info-eye-btn');

            fireEvent.click(eyeButtonElement);

            expect(onEyeIconClick).toHaveBeenCalledTimes(1);
        });

        it('renders BankСardView component with image', () => {
            render(
                <BankСardView.Image
                    imageUrl='https://online.alfabank.ru/cards-images/cards/'
                    layers='BACKGROUND,LOGO,PAYMENT_SYSTEM'
                    cardId='RM'
                />,
            );

            const imageElement = screen.getByAltText('card');
            expect(imageElement).toBeInTheDocument();
        });

        it('does not render user info when the size of the card is small', () => {
            render(
                <BankСardView.Image
                    size={[16, 24]}
                    cardholderName='Cardholder Name'
                    dataTestId='card'
                />,
            );

            const userInfo = screen.queryByTestId('card-user-info');
            expect(userInfo).not.toBeInTheDocument();
        });

        it('renders BankСardView component with overlay', () => {
            const { container } = render(<BankСardView.Image statusIcon={DiamondsXxlIcon} />);

            const statusIcon = container.querySelector('.overlay');
            expect(statusIcon).toBeInTheDocument();
        });

        it('should unmount without errors', () => {
            const { unmount } = render(<BankСardView.Image />);

            expect(unmount).not.toThrowError();
        });
    });
});

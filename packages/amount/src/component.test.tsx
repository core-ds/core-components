import React from 'react';
import { render } from '@testing-library/react';

import { Amount, CurrencyCodes } from '.';

describe('Amount', () => {
    it('should match snapshots for base and Pure components', () => {
        const { container } = render(
            <React.Fragment>
                <Amount value={100} currency='RUR' minority={100} />
                <Amount.Pure value={100} currency='RUR' minority={100} />
            </React.Fragment>,
        );
        expect(container).toMatchSnapshot();
    });

    it('should render rightAddons', () => {
        const { container } = render(
            <React.Fragment>
                <Amount value={100} rightAddons={<span />} minority={100} />
                <Amount.Pure value={100} rightAddons={<span />} minority={100} />
            </React.Fragment>,
        );
        expect(container).toMatchSnapshot();
    });

    it('should render plus sign when showPlus and value > 0', () => {
        const { container } = render(
            <React.Fragment>
                <Amount value={100} showPlus={true} minority={100} />
                <Amount.Pure value={100} showPlus={true} minority={100} />
            </React.Fragment>,
        );
        expect(container).toMatchSnapshot();
    });

    it('should not render plus sign when showPlus and value <= 0', () => {
        const { container } = render(
            <React.Fragment>
                <Amount value={0} showPlus={true} minority={100} />
                <Amount value={-100} showPlus={true} minority={100} />
                <Amount.Pure value={0} showPlus={true} minority={100} />
                <Amount.Pure value={-100} showPlus={true} minority={100} />
            </React.Fragment>,
        );
        expect(container).toMatchSnapshot();
    });
    it('should not render undefined', () => {
        const { container } = render(
            <Amount value={0} minority={100} currency={'THT' as CurrencyCodes} />,
        );
        expect(container).toMatchSnapshot();
    });

    it('should displayed correctly with in letter format code', () => {
        const currency = 'RUB';

        const { getByText } = render(
            <Amount value={1234500} currency={currency} minority={100} codeFormat='letter' />,
        );

        expect(getByText(currency)).toBeInTheDocument();
    });
});

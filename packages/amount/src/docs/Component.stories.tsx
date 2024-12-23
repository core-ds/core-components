import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean, number } from '@storybook/addon-knobs';
import { getAllCurrencyCodes } from '@alfalab/utils';
import { Container, Row, Col } from 'storybook/blocks/grid';
import { Amount } from '@alfalab/core-components-amount';

const meta: Meta<typeof Amount> = {
    title: 'Components/Amount',
    component: Amount,
    id: 'Amount',
};

type Story = StoryObj<typeof Amount>;

const deprecatedCurrencies = ['RUR'];

// переносим в конец списка все элементы из массива deprecatedCurrencies
const sortDeprecatedCurrencies = (currencies: string[]) => {
    const newCurrencies = [...currencies];

    for (let currency of currencies) {
        if (deprecatedCurrencies.includes(currency)) {
            const index = newCurrencies.findIndex((item) => item === currency);
            newCurrencies.push(newCurrencies.splice(index, 1)[0]);
        }
    }

    return newCurrencies;
};

export const amount: Story = {
    name: 'Amount',
    render: () => {
        const currencyCodes = sortDeprecatedCurrencies(getAllCurrencyCodes());
        const value = number('value', 10099);
        const currency = select('currency', currencyCodes, 'RUB');
        const minority = number('minority', 100);
        const showPlus = boolean('showPlus', false);
        const view = select('view', ['default', 'withZeroMinorPart'], 'default');
        const codeFormat = select('codeFormat', ['symbolic', 'letter'], 'symbolic');
        const bold = select('bold', ['full', 'major', 'none'], 'bold');
        const transparentMinor = boolean('transparentMinor', true);
        return (
            <Container>
                <Row>
                    <Col>Amount</Col>
                    <Col>Amount.Pure (Без стилей)</Col>
                </Row>
                <Row>
                    <Col>
                        <Amount
                            value={value}
                            currency={currency}
                            minority={minority}
                            showPlus={showPlus}
                            view={view}
                            codeFormat={codeFormat}
                            bold={bold}
                            transparentMinor={transparentMinor}
                        />
                    </Col>
                    <Col>
                        <Amount.Pure
                            value={value}
                            currency={currency}
                            minority={minority}
                            showPlus={showPlus}
                            view={view}
                        />
                    </Col>
                </Row>
            </Container>
        );
    },
};

export default meta;

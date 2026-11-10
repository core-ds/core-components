import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { render } from '@testing-library/react';

import { ButtonDesktop } from '../../button/src/desktop';
import { ButtonMobile } from '../../button/src/mobile';
import { Icon20Adapter } from '../../shared/src/icon-20-adapter';
import { Spinner } from '../../spinner/src';
import { IndicatorTag } from '../../tag/src';
import { TagDesktop } from '../../tag/src/desktop';
import { TagMobile } from '../../tag/src/mobile';
import { IconButtonDesktop } from '../src/desktop';
import { IconButtonMobile } from '../src/mobile';

const { createRuntime } = require('../../../tools/code-connect/template-test-runtime.cjs');

const repo = path.resolve(__dirname, '../../..');
const runtime = createRuntime(repo);
const controls = JSON.parse(
    fs.readFileSync(path.join(repo, 'tools/code-connect/cases/controls.json'), 'utf8'),
).cases;
const libraryCases = JSON.parse(
    fs.readFileSync(path.join(repo, 'tools/code-connect/cases-libraries.json'), 'utf8'),
).cases;
const allCases = fs
    .readdirSync(path.join(repo, 'tools/code-connect/cases'))
    .filter((file) => file.endsWith('.json'))
    .flatMap(
        (file) =>
            JSON.parse(fs.readFileSync(path.join(repo, 'tools/code-connect/cases', file), 'utf8'))
                .cases,
    );
const templates = [
    'IconButtonDesktop',
    'IconButtonMobile',
    'IconButtonInvertedDesktop',
    'IconButtonInvertedMobile',
];

function example(body: string): (props: { actionLabel: string }) => React.ReactElement {
    const source = body.startsWith('function Example') ? body : `const Example = () => (${body});`;
    const { outputText, diagnostics } = ts.transpileModule(source, {
        fileName: 'example.tsx',
        reportDiagnostics: true,
        compilerOptions: { jsx: ts.JsxEmit.React },
    });

    expect(diagnostics).toHaveLength(0);

    return vm.runInNewContext(`${outputText}\nExample;`, {
        React,
        IconButtonDesktop,
        IconButtonMobile,
        Icon20Adapter,
        Spinner,
        ActualIcon: () => <svg aria-hidden='true' />,
        ButtonDesktop,
        ButtonMobile,
        TagDesktop,
        TagMobile,
        IndicatorTag,
    });
}

describe('Доступное имя Code Connect IconButton', () => {
    it.each(templates)('%s требует контекста при вложении в CustomButton', (component) => {
        const parent = JSON.parse(
            JSON.stringify(
                allCases.find(
                    (test: { template: string; throws?: string }) =>
                        test.template.endsWith('/CustomButton.figma.ts') && !test.throws,
                ),
            ),
        );
        const child = controls.find((test: { template: string }) =>
            test.template.endsWith(`/${component}.figma.ts`),
        );

        parent.fixture.children[0] = {
            ...child.fixture,
            path: ['Content'],
            template: child.template,
        };
        expect(() => runtime.evaluate(parent.template, parent.fixture)).toThrow(
            'требует контекста',
        );
    });

    it.each(templates)('%s передаёт название действия во всех состояниях', (component) => {
        const template = `packages/icon-button/code-connect/${component}.figma.ts`;
        const base = controls.find((test: { template: string }) => test.template === template);

        for (const size of ['24', '32', '40', '48', '56'])
            for (const view of ['Primary', 'Secondary', 'Tertiary', 'Negative'])
                for (const transparentBg of ['False', 'True'])
                    for (const type of [
                        'Icon 24',
                        'Icon 16',
                        'icon-20',
                        'Spinner 24',
                        'Spinner 16',
                    ]) {
                        const fixture = JSON.parse(JSON.stringify(base.fixture));
                        const slot = fixture.children[0];

                        fixture.properties = {
                            Size: size,
                            View: view,
                            TransparentBg: transparentBg,
                        };
                        slot.properties.Type = type;
                        slot.swaps = Object.fromEntries(
                            ['Icon-24', 'Icon-16', 'Icon-20'].map((name) => [
                                name,
                                {
                                    type: 'INSTANCE',
                                    name: 'Декоративная иконка',
                                    code: '<ActualIcon />',
                                },
                            ]),
                        );
                        slot.children = [
                            {
                                type: 'INSTANCE',
                                name: 'Spinner',
                                code: `<Spinner visible preset={${type === 'Spinner 16' ? 16 : 24}} />`,
                            },
                        ];
                        const result = runtime.evaluate(template, fixture);
                        const Example = example(runtime.flatten(result.example));

                        expect(result.metadata.nestable).toBe(false);
                        expect([...result.metadata.props.contextFields]).toEqual(['actionLabel']);
                        for (const actionLabel of ['Открыть настройки', 'Удалить «Черновик»']) {
                            const screen = render(<Example actionLabel={actionLabel} />);

                            expect(
                                screen.getByRole('button', { name: actionLabel }),
                            ).toBeInTheDocument();
                            screen.unmount();
                        }
                        expect(() => Example({ actionLabel: '   ' })).toThrow(
                            'Укажите название действия IconButton',
                        );
                    }
    });

    it.each([
        ['button', 'ButtonDesktop'],
        ['button', 'ButtonMobile'],
        ['button', 'ButtonInvertedDesktop'],
        ['button', 'ButtonInvertedMobile'],
        ...[
            'TagDesktop',
            'TagFilledMobile',
            'TagFilledInvertedDesktop',
            'TagFilledInvertedMobile',
            'TagMutedDesktop',
            'TagMutedMobile',
            'TagTransparentDesktop',
            'TagTransparentMobile',
            'TagTransparentInvertedDesktop',
            'TagTransparentInvertedMobile',
        ].map((name) => ['tag', name]),
    ])('%s/%s сохраняет имя из подписи Figma', (family, component) => {
        const base = controls.find((test: { template: string }) =>
            test.template.endsWith(
                family === 'button' ? '/ButtonMobile.figma.ts' : '/TagFilledMobile.figma.ts',
            ),
        );
        const fixture = JSON.parse(JSON.stringify(base.fixture));
        const label = 'Название из Figma';

        fixture.properties['✎ Label'] = label;
        const result = runtime.evaluate(
            `packages/${family}/code-connect/${component}.figma.ts`,
            fixture,
        );
        const Example = example(runtime.flatten(result.example));
        const screen = render(<Example actionLabel='Не подставлять это имя' />);

        expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });

    it.each(['AttachDesktop', 'AttachMobile', 'TabsSecondaryDesktop', 'TabsSecondaryMobile'])(
        '%s сохраняет отказ для режима без подписи',
        (component) => {
            const base = libraryCases.find(
                (test: { template: string; throws?: string }) =>
                    test.template.endsWith(`/${component}.figma.ts`) && !test.throws,
            );
            const fixture = JSON.parse(JSON.stringify(base.fixture));

            function withoutLabel(node: Record<string, any>) {
                for (const key of Object.keys(node.properties || {})) {
                    if (key.split('#')[0].trim() === 'Label') node.properties![key] = false;
                    if (component.startsWith('Attach') && key.split('#')[0].trim() === 'SingleIcon')
                        node.properties![key] = 'True';
                }
                for (const value of Object.values(node)) {
                    if (Array.isArray(value)) value.forEach(withoutLabel);
                    else if (value && typeof value === 'object') withoutLabel(value);
                }
            }

            withoutLabel(fixture);
            expect(() => runtime.evaluate(base.template, fixture)).toThrow(
                component.startsWith('Attach') ? 'без текстового содержимого' : 'видимая подпись',
            );
        },
    );
});

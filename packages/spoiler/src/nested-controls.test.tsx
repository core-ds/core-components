import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Spoiler } from './Component';

jest.mock('./hooks/use-particles', () => ({
    useParticles: () => {
        const { useRef } = jest.requireActual('react');
        return {
            rootRef: useRef(null),
            contentRef: useRef(null),
            anchorRef: useRef(null),
            canvasRef: useRef(null),
            ready: false,
        };
    },
}));

describe.each(['text', 'element'] as const)('Вложенные элементы Spoiler: %s', (mode) => {
    it.each([
        [
            'ссылка',
            <a href='#track' data-test-id='target'>
                RA123
            </a>,
            'Enter',
        ],
        [
            'кнопка',
            <button type='button' data-test-id='target'>
                Скопировать
            </button>,
            'Enter',
        ],
        ['поле ввода', <input aria-label='Комментарий' data-test-id='target' />, ' '],
    ])('%s: клавиша не отменяется и не скрывает содержимое', (_, child, key) => {
        const onOpenChange = jest.fn();
        render(
            <Spoiler mode={mode} defaultOpen onOpenChange={onOpenChange}>
                {child}
            </Spoiler>,
        );

        expect(fireEvent.keyDown(screen.getByTestId('target'), { key })).toBe(true);
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(screen.getByTestId('target').closest('[data-spoiler-content]')).not.toHaveAttribute(
            'inert',
        );
    });

    it.each([
        [
            'ссылка',
            <a href='#track'>
                <span data-test-id='target'>RA123</span>
            </a>,
        ],
        [
            'кнопка',
            <button type='button'>
                <span data-test-id='target'>Скопировать</span>
            </button>,
        ],
        ['поле ввода', <input aria-label='Комментарий' data-test-id='target' />],
        [
            'summary',
            <details>
                <summary data-test-id='target'>Подробнее</summary>Текст
            </details>,
        ],
        [
            'contentEditable',
            <span contentEditable suppressContentEditableWarning>
                <span data-test-id='target'>Текст</span>
            </span>,
        ],
        [
            'label',
            <label data-test-id='target'>
                Согласие
                <input type='checkbox' />
            </label>,
        ],
        [
            'tabIndex',
            <span tabIndex={0} data-test-id='target'>
                Контрол
            </span>,
        ],
        [
            'role',
            <span role='button' data-test-id='target'>
                Контрол
            </span>,
        ],
    ])('%s: клик и пользовательский обработчик работают без скрытия', (_, child) => {
        const onOpenChange = jest.fn();
        const onClick = jest.fn();
        render(
            <Spoiler mode={mode} defaultOpen onOpenChange={onOpenChange} onClick={onClick}>
                {child}
            </Spoiler>,
        );

        expect(fireEvent.click(screen.getByTestId('target'))).toBe(true);
        expect(onClick).toHaveBeenCalled();
        expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('обычный текст скрывает содержимое, Enter на корне раскрывает', () => {
        render(
            <Spoiler mode={mode} defaultOpen dataTestId='root'>
                <span data-test-id='text'>Баланс</span>
            </Spoiler>,
        );
        fireEvent.click(screen.getByTestId('text'));
        expect(screen.getByTestId('root')).toHaveAttribute('aria-expanded', 'false');
        fireEvent.keyDown(screen.getByTestId('root'), { key: 'Enter' });
        expect(screen.getByTestId('root')).toHaveAttribute('aria-expanded', 'true');
    });
});

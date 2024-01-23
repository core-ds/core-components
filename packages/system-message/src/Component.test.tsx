import React from 'react';
import { render } from '@testing-library/react';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';

import { SystemMessage } from '.';
import { getSystemMessageTestIds } from './utils';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

const systemMessageDti = 'system-message';
const graphicDti = `${systemMessageDti}-graphic`;
const titleDti = `${systemMessageDti}-title`;
const subtitleDti = `${systemMessageDti}-subtitle`;
const captionDti = `${systemMessageDti}-caption`;
const controlsDti = `${systemMessageDti}-controls`;

describe('SystemMessage', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Graphic>i</SystemMessage.Graphic>
                    <SystemMessage.Title>Title</SystemMessage.Title>
                    <SystemMessage.Subtitle>Subtitle</SystemMessage.Subtitle>
                    <SystemMessage.Caption>Caption</SystemMessage.Caption>
                    <SystemMessage.Controls>Buttons</SystemMessage.Controls>
                </SystemMessage>,
            );

            expect(container).toMatchSnapshot();
        });
    });

    describe('props tests', () => {
        it('should set className to parent', function () {
            const className = 'system-message';

            const { getByTestId } = render(
                <SystemMessage dataTestId={systemMessageDti} className={className}>
                    <div />
                </SystemMessage>,
            );

            expect(getByTestId(systemMessageDti)).toHaveClass(className);
        });

        it('should set className to Graphic', function () {
            const className = 'graphic';

            const { getByTestId } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Graphic className={className}>
                        <div />
                    </SystemMessage.Graphic>
                </SystemMessage>,
            );

            expect(getByTestId(graphicDti)).toHaveClass(className);
        });

        it('should set className to Title', function () {
            const className = 'title';

            const { getByTestId } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Title className={className}>Title</SystemMessage.Title>
                </SystemMessage>,
            );

            expect(getByTestId(titleDti)).toHaveClass(className);
        });

        it('should set className to Subtitle', function () {
            const className = 'subtitle';

            const { getByTestId } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Subtitle className={className}>Subtitle</SystemMessage.Subtitle>
                </SystemMessage>,
            );

            expect(getByTestId(subtitleDti)).toHaveClass(className);
        });

        it('should set className to Caption', function () {
            const className = 'caption';

            const { getByTestId } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Caption className={className}>Subtitle</SystemMessage.Caption>
                </SystemMessage>,
            );

            expect(getByTestId(captionDti)).toHaveClass(className);
        });

        it('should set className to controls', function () {
            const className = 'controls';

            const { getByTestId } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Controls className={className}>Controls</SystemMessage.Controls>
                </SystemMessage>,
            );

            expect(getByTestId(controlsDti)).toHaveClass(className);
        });

        it('should have data-test-id', () => {
            const { getByTestId } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Graphic>
                        <StarMIcon />
                    </SystemMessage.Graphic>
                    <SystemMessage.Title>Title</SystemMessage.Title>
                    <SystemMessage.Subtitle>Subtitle</SystemMessage.Subtitle>
                    <SystemMessage.Caption>Caption</SystemMessage.Caption>
                    <SystemMessage.Controls>Buttons</SystemMessage.Controls>
                </SystemMessage>,
            );

            const testIds = getSystemMessageTestIds(systemMessageDti);

            expect(getByTestId(testIds.systemMessage)).toBeInTheDocument();
            expect(getByTestId(testIds.caption)).toBeInTheDocument();
            expect(getByTestId(testIds.controls)).toBeInTheDocument();
            expect(getByTestId(testIds.graphic)).toBeInTheDocument();
            expect(getByTestId(testIds.subtitle)).toBeInTheDocument();
            expect(getByTestId(testIds.title)).toBeInTheDocument();
        });
    });

    describe('render tests', () => {
        it('should unmount without errors', function () {
            const { unmount } = render(
                <SystemMessage dataTestId={systemMessageDti}>
                    <SystemMessage.Graphic>
                        <StarMIcon />
                    </SystemMessage.Graphic>
                    <SystemMessage.Title>Title</SystemMessage.Title>
                    <SystemMessage.Subtitle>Subtitle</SystemMessage.Subtitle>
                    <SystemMessage.Caption>Caption</SystemMessage.Caption>
                    <SystemMessage.Controls>Buttons</SystemMessage.Controls>
                </SystemMessage>,
            );

            expect(unmount).not.toThrowError();
        });
    });
});

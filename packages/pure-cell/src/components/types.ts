import { ReactElement, ReactNode } from 'react';
import { Comment } from '@alfalab/core-components-comment';

import { Amount } from './amount';
import { AmountTitle } from './amount-title';
import { FooterButton } from './footer-button';
import { FooterText } from './footer-text';
import { Graphics } from './graphics';
import { Text } from './text';

type TextElement = ReactElement<typeof Text>;
export type GraphicsElement = ReactElement<typeof Graphics>;
type AmountElement = ReactElement<typeof Amount>;
type AmountTitleElement = ReactElement<typeof AmountTitle>;
export type CommentElement = ReactElement<typeof Comment>;
type FooterButtonElement = ReactElement<typeof FooterButton>;
type FooterTitleElement = ReactElement<typeof FooterText>;
export type FooterElement =
    | Array<ReactElement<FooterButtonElement> | FooterTitleElement>
    | CommentElement;
export type MainElement =
    | Array<TextElement | AmountElement | AmountTitleElement>
    | (TextElement | AmountElement | AmountTitleElement);
export type ContentElement = Array<MainElement | AddonElement | FooterElement> | MainElement;
export type AddonElement = Array<TextElement | ReactNode> | TextElement | ReactNode;
export type PureCellElement = Array<GraphicsElement | ContentElement> | ContentElement;

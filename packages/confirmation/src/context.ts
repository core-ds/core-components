import { createContext } from 'react';

import { type TConfirmationContext } from './types';
import { ONE_DAY, ONE_MINUTE } from './utils';

const mockFn = () => undefined;

export const ConfirmationContext = createContext<TConfirmationContext>({
    alignContent: 'left',
    titleTag: 'h3',
    texts: {},
    state: 'INITIAL',
    screen: 'INITIAL',
    requiredCharAmount: 5,
    countdownDuration: ONE_MINUTE,
    timeLeft: ONE_MINUTE,
    tempBlockDuration: ONE_DAY,
    phone: '',
    hideCountdownSection: false,
    breakpoint: 1024,
    client: 'desktop',
    initialScreenHintSlot: null,
    onTempBlockFinished: mockFn,
    onInputFinished: mockFn,
    onChangeState: mockFn,
    onSmsRetryClick: mockFn,
    onChangeScreen: mockFn,
    onFatalErrorOkButtonClick: mockFn,
});

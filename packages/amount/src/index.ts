import { PureAmount } from './pure/component';
import { Amount as DefaultAmount } from './component';

type AmountType = typeof DefaultAmount & { Pure: typeof PureAmount };

export const Amount: AmountType = DefaultAmount as AmountType;
Amount.Pure = PureAmount;

export * from './types';

export { DefaultAmount as AmountComponent, PureAmount as Pure };

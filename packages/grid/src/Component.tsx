import { FC } from 'react';

import { Col, ColProps } from './col';
import { Row, RowProps } from './row';

export const Grid: {
    Row: FC<RowProps>;
    Col: FC<ColProps>;
} = {
    Row,
    Col,
};

export { Row, Col };

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import styles from './index.module.css';
import transitions from './transitions.module.css';

export type InputProgressProps = {
    maxCodeLength: number;
    codeLength?: number;
    error: boolean;
    value?: string;
    dataTestId?: string;
};

const TRANSITION_DURATION = 150;

export const InputProgress: React.FC<InputProgressProps> = ({
    value = '',
    maxCodeLength,
    codeLength,
    error,
    dataTestId,
}) => (
    <div
        className={cn(styles.component, { [transitions.shake]: error })}
        data-test-id={getDataTestId(dataTestId, 'input-progress')}
    >
        {codeLength
            ? new Array(codeLength).fill(null).map((_, i) => {
                  const filled = Boolean(value[i]);

                  return (
                      <div className={cn(styles.dotWrapper)} key={i}>
                          <div
                              className={cn(styles.dot, {
                                  [styles.error]: filled && error,
                                  [styles.filled]: filled,
                              })}
                          />
                      </div>
                  );
              })
            : new Array(maxCodeLength).fill(null).map((_, i) => (
                  <CSSTransition
                      key={i}
                      in={Boolean(value[i])}
                      timeout={TRANSITION_DURATION}
                      classNames={transitions}
                      unmountOnExit={true}
                  >
                      <div className={cn(styles.dotWrapper)}>
                          <div
                              className={cn(styles.dot, styles.filled, { [styles.error]: error })}
                          />
                      </div>
                  </CSSTransition>
              ))}
    </div>
);

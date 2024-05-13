import React from 'react';
import classes from './ConfigIcon.module.css';
import type { BpmnTaskType } from '../../../../types/BpmnTaskType';
import {
  ConfirmationTaskIcon,
  DataTaskIcon,
  FeedbackTaskIcon,
  PaymentTaskIcon,
  ReceiptIcon,
  SignTaskIcon,
} from '@studio/icons';

export type ConfigIconProps = {
  taskType: BpmnTaskType;
};

export const ConfigIcon = ({ taskType }: ConfigIconProps): React.ReactElement => {
  switch (taskType) {
    case 'data':
      return <DataTaskIcon className={classes.icon} />;
    case 'confirmation':
      return <ConfirmationTaskIcon className={classes.icon} />;
    case 'feedback':
      return <FeedbackTaskIcon className={classes.icon} />;
    case 'signing':
      return <SignTaskIcon className={classes.icon} />;
    case 'payment':
      return <PaymentTaskIcon className={classes.icon} />;
    case 'endEvent':
      return <ReceiptIcon className={classes.icon} />;
  }
};

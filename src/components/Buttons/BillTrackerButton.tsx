import { useCallback } from 'react';

import {
  useCreateBillTrackerMutation,
  useDeleteBillTrackerMutation,
  useFetchBillTrackerQuery
} from '../../services/billTracker';
import { Confirm } from '../Confirm';
import {
  PauseIcon,
  PlayIcon
} from '../Icons';

import { TooltipIconButton } from './TooltipIconButton';
import { ButtonProps } from './types';

export const BillTrackerButton = (
  props: ButtonProps
): JSX.Element => {
  const [ createBillTracker ] = useCreateBillTrackerMutation();
  const [ deleteBillTracker ] = useDeleteBillTrackerMutation();
  const { data: billTracker } = useFetchBillTrackerQuery({});
  const tooltip = billTracker ? 'Stop Bill Tracker' : 'Start Bill Tracker';

  const onToggleTracker = useCallback((): void => {
    if (billTracker?.id != null) {
      void deleteBillTracker(billTracker.id);
      return;
    }
    void createBillTracker({});
  }, [ billTracker?.id, deleteBillTracker, createBillTracker ]);

  return (
    <Confirm
      title={`Are you sure to "${tooltip}"?`}
      placement="leftTop"
      onConfirm={onToggleTracker}
    >
      <TooltipIconButton
        danger={!!billTracker}
        tooltip={tooltip}
        data-testid="bill-tracker-btn"
        icon={billTracker ? <PauseIcon /> : <PlayIcon />}
        {...props}
      />
    </Confirm>
  );
};

import {ActionProps, TriggerActionTypes, TriggersProps} from '../../../types';

const initialState: TriggersProps = {
  data: [],
};

export const reducer =
(state: TriggersProps = initialState, action: ActionProps): TriggersProps => {
  if ( action.type == TriggerActionTypes.TRIGGER_SUCCESS ) {
    const myTriggersData: TriggersProps = action.payload as TriggersProps;
    return {...state, data: myTriggersData.data};
  } else {
    return state;
  }
};

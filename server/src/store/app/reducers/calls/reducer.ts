import {ActionProps, CallActionTypes, CallsProps} from '../../../types';

const initialState: CallsProps = {
  data: [],
};

export const reducer =
(state: CallsProps = initialState, action: ActionProps): CallsProps => {
  if ( action.type == CallActionTypes.CALL_SUCCESS ) {
    const myCallsData: CallsProps = action.payload as CallsProps;
    return {...state, data: myCallsData.data};
  } else {
    return state;
  }
};

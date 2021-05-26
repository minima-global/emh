
import {
  ActionProps,
  StatusActionTypes,
  StatusProps,
} from '../../../types';


const initialState: StatusProps = {
  data: [],
};

export const reducer =
(state: StatusProps = initialState, action: ActionProps): StatusProps => {
  if ( action.type == StatusActionTypes.STATUS_SUCCESS ) {
    const statusData: StatusProps = action.payload as StatusProps;
    return {...state, data: statusData.data};
  } else {
    return state;
  }
};

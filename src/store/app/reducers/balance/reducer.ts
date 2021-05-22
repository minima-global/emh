
import {
  ActionProps,
  BalanceActionTypes,
  BalanceProps,
} from '../../../types';


const initialState: BalanceProps = {
  data: [],
};

export const reducer =
(state: BalanceProps = initialState, action: ActionProps): BalanceProps => {
  if ( action.type == BalanceActionTypes.BALANCE_SUCCESS ) {
    const balanceData: BalanceProps = action.payload as BalanceProps;
    return {...state, data: balanceData.data};
  } else {
    return state;
  }
};

import {ActionProps, TxActionTypes, TxProps} from '../../../types';

const initialState: TxProps = {
  data: {
    code: '',
    summary: '',
    time: '',
  },
};

export const reducer =
(state: TxProps = initialState, action: ActionProps): TxProps => {
  // console.log( action )
  switch (action.type) {
    case TxActionTypes.TX_INIT: {
      const data = (action.payload as TxProps);
      return data;
    }
    case TxActionTypes.TX_PENDING:
    case TxActionTypes.TX_SUCCESS:
    case TxActionTypes.TX_FAILURE: {
      const data = (action.payload as TxProps);
      return {...state, ...data};
    }
    default:
      return state;
  }
};

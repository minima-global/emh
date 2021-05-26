import {ActionProps, TokenIdActionTypes, TokenIdProps} from '../../../types';

const initialState: TokenIdProps = {
  data: [],
};

export const reducer =
(state: TokenIdProps = initialState, action: ActionProps): TokenIdProps => {
  if ( action.type == TokenIdActionTypes.TOKENID_SUCCESS ) {
    const myTokenIdData: TokenIdProps = action.payload as TokenIdProps;
    return {...state, data: myTokenIdData.data};
  } else {
    return state;
  }
};

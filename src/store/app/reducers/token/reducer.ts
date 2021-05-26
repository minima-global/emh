
import {
  ActionProps,
  TokenActionTypes,
  TokenProps,
} from '../../../types';


const initialState: TokenProps = {
  data: [],
};

export const reducer =
(state: TokenProps = initialState, action: ActionProps): TokenProps => {
  if ( action.type == TokenActionTypes.TOKEN_SUCCESS ) {
    const tokenData: TokenProps = action.payload as TokenProps;
    return {...state, data: tokenData.data};
  } else {
    return state;
  }
};

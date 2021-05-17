import {ActionProps, TokenActionTypes, TokensProps} from '../../../types';

const initialState: TokensProps = {
  data: [],
};

export const reducer =
(state: TokensProps = initialState, action: ActionProps): TokensProps => {
  if ( action.type == TokenActionTypes.TOKEN_SUCCESS ) {
    const myTokensData: TokensProps = action.payload as TokensProps;
    return {...state, data: myTokensData.data};
  } else {
    return state;
  }
};

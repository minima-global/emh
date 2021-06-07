import { ActionProps, BalanceActionTypes, BalanceProps } from '../../../types'

const initialState: BalanceProps = {
  data: []
}

export const reducer = (state: BalanceProps = initialState, action: ActionProps): BalanceProps => {
  //console.log('blockchain info: ', action.type, action.payload)
  if ( action.type == BalanceActionTypes.GET_BALANCES ) {
    const balanceData: BalanceProps = action.payload as BalanceProps
    return { ...state, data: balanceData.data }
  } else {
    return state
  }
}

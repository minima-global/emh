import { ActionProps, AddressActionTypes, AddressProps } from '../../../types'

const initialState: AddressProps = {
  data: []
}

export const reducer = (state: AddressProps = initialState, action: ActionProps): AddressProps => {
  //console.log('blockchain info: ', action.type, action.payload)
  if ( action.type == AddressActionTypes.GET_ADDRESSES ) {
    const addressData: AddressProps = action.payload as AddressProps
    return { ...state, data: addressData.data }
  } else {
    return state
  }
}

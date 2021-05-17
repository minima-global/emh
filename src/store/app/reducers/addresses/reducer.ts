import {ActionProps, AddressActionTypes, AddressProps} from '../../../types';

const initialState: AddressProps = {
  data: [],
};

export const reducer =
(state: AddressProps = initialState, action: ActionProps): AddressProps => {
  if ( action.type == AddressActionTypes.ADDRESS_SUCCESS ) {
    const myAddressData: AddressProps = action.payload as AddressProps;
    return {...state, data: myAddressData.data};
  } else {
    return state;
  }
};

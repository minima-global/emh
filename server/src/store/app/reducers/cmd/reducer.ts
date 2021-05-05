import {ActionProps, CmdActionTypes, CmdProps} from '../../../types';

const initialState: CmdProps = {
  data: [],
};

export const reducer =
(state: CmdProps = initialState, action: ActionProps): CmdProps => {
  // console.log('blockchain info: ', action.type, action.payload)
  if ( action.type == CmdActionTypes.CMD_SUCCESS ) {
    const myCmdData: CmdProps = action.payload as CmdProps;
    return {...state, data: myCmdData.data};
  } else {
    return state;
  }
};

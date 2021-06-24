import {ActionProps, CmdActionTypes, CmdProps} from '../../../types';

const initialState: CmdProps = {
  data: [],
};

export const reducer =
(state: CmdProps = initialState, action: ActionProps): CmdProps => {
  // console.log('blockchain info: ', action.type, action.payload)
  switch (action.type) {
    case CmdActionTypes.CMD_INIT: {
      return initialState;
    }
    case CmdActionTypes.CMD_FAILURE: {
      return state;
    }
    case CmdActionTypes.CMD_SUCCESS: {
      const myCmdData: CmdProps = action.payload as CmdProps;
      return {...state, data: myCmdData.data};
    }
    default:
      return state;
  }
};

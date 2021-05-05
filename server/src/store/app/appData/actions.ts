import {
  AppDispatch,
  AppDataActionTypes,
  AppData,
  PageTypes,
} from '../../types';


import {write} from '../../actions';

export const setActivePage = (page: PageTypes) => {
  return async (dispatch: AppDispatch) => {
    const appData: AppData = {
      activePage: page,
    };

    dispatch(write({data: appData})(AppDataActionTypes.APPDATA_SUCCESS));
  };
};

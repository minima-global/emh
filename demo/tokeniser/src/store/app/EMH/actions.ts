import { Minima } from 'minima';

import {
  AppDispatch,
  ActionTypes,
  NewToken,
  Token,
  TxActionTypes,
  TxData,
} from '../../types';

import {
  Transaction,
  Remote,
  Post,
} from '../../../config';

import {write} from '../../actions';

/**
 * Initialises the app
 * @return {function}
 */
export const init = () => {
  return async (dispatch: AppDispatch) => {
  };
};

/**
 * Initialises the Redux Tx store
 * @return {function}
 */
export const initTx = () => {
  return async (dispatch: AppDispatch) => {
    const initAction: ActionTypes = TxActionTypes.TX_INIT;
    const txInit: TxData = {
      code: '',
      summary: '',
      time: '',
    };
    dispatch(write({data: txInit})(initAction));
  };
};

export const createToken = (token: NewToken) => {
  return async (dispatch: AppDispatch) => {
    const time = new Date(Date.now()).toString();
    const pendingData: TxData = {
      code: '200',
      summary: Transaction.pending,
      time: time,
    };
    dispatch(write({data: pendingData})(TxActionTypes.TX_PENDING));

    // eslint-disable-next-line max-len
    // 127.0.0.1:9004/api/EMH/?command=tokenCreate&name=AnotherTest&amount=1&description="Another Test Token"&script="RETURN TRUE"&icon=""&proof=""
    // eslint-disable-next-line max-len
    const url =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.tokenCommand}&${Remote.nameParam}="${token.name}"&${Remote.amountParam}=${token.amount}&${Remote.descriptionParam}="${token.description}"&${Remote.scriptParam}="${token.script}"&${Remote.iconParam}="${token.icon}"&${Remote.proofParam}="${token.proof}"`
    const encodedURL = encodeURI(url);

    // console.log(encodedURL);

    Minima.net.GET(encodedURL, function(getResult) {
      const result = decodeURIComponent(getResult.result)
      const resultObject = JSON.parse(result);
      if ( resultObject.status ) {

        console.log('Yay!', resultObject);
        const txData = {
          code: "200",
          summary: Post.postSuccess,
          time: time
        }
        dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
      } else {

        console.log('Boo: ', resultObject);
        const txData = {
          code: "400",
          summary: Post.postFailure,
          time: time
        }
        dispatch(write({data: txData})(TxActionTypes.TX_FAILURE))
      }
    });
  };
}

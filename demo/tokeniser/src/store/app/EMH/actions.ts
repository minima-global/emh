import {Address} from 'minima';

import {
  AppDispatch,
  NewSend,
  NewToken,
  BalanceProps,
  BalanceActionTypes,
  TxActionTypes,
  TxData,
  AddressProps,
  AddressActionTypes,
} from '../../types';

import {
  App,
  Transaction,
  Remote,
} from '../../../config';

import {write} from '../../actions';

let ws: any;

/**
 * Process EMH websocket messages
 * @return {function} 
*/
export const processMessage = (msg: any) => {
  return async (dispatch: AppDispatch) => {

    // console.log('got message, ', msg);

    if (msg.event == "newbalance") {  
        
      // console.log('Got balance message ', jmsg)        
      
      const balanceData: BalanceProps = {
        data: []
      }      
      for( let i = 0; i < msg.balance.length; i++ ) {    
        balanceData.data.push(msg.balance[i])
      }
  
      dispatch(write({ data: balanceData.data })(BalanceActionTypes.GET_BALANCES))
    } 
  };
};

/**
 * Close app websocket
 * @return {function} 
*/
const closeNetwork = () => {
  return async (dispatch: AppDispatch) => { 
    ws.close();  
  };
};

/**
 * Initialises app network
*/
 const initNetwork = () => {
  return async (dispatch: AppDispatch) => {
   
    if (ws) {
      ws.close();
    }
    ws = new WebSocket(Remote.websocketServer);
    const uid = { "type":"minidappid", "minidappid": App.minidappId };
    
    ws.onopen = async () => {
      //Connected
      console.log("Starting WebSocket Listener @ " + Remote.websocketServer);

      //Now set the MiniDAPPID

      //Send your name..
      ws.send(JSON.stringify(uid));
    };

    ws.onmessage = (evt: any) => {
      //Convert to JSON
      const jmsg = JSON.parse(evt.data);
      dispatch(processMessage(jmsg));
    }

    ws.onclose = async () => {
      console.log("Stopping WebSocket Listener @ " + Remote.websocketServer)
    }

    ws.onerror = (error: any) => {
      //let err = JSON.stringify(error);
      const err = JSON.stringify(error, ["message", "arguments", "type", "name", "data"]);
      // websocket is closed.
      console.error("Minima WS Listener Error ... ", err);
    }
  };
};

/**
 * Initialises the app
 * @return {function}
 */
export const init = () => {
  return async (dispatch: AppDispatch) => {

    await dispatch(initNetwork());  
    dispatch(balance());  
  };
};

/**
 * Initialises the app
 * @return {function}
 */
 export const close = () => {
  return async (dispatch: AppDispatch) => {

    dispatch(closeNetwork());
  };
};

/**
 * Initialises the Redux Tx store
 * @return {function}
 */
export const initTx = () => {
  return async (dispatch: AppDispatch) => {
    const txInit: TxData = {
      code: '',
      summary: '',
      time: '',
    };
    dispatch(write({data: txInit})(TxActionTypes.TX_INIT));
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

    const createUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.createTokenCommand}&${Remote.nameParam}="${token.name}"&${Remote.amountParam}=${token.amount}&${Remote.descriptionParam}="${token.description}"&${Remote.iconParam}="${token.icon}"&${Remote.proofParam}="${token.proof}"`
    // const encodedCreate = encodeURI(createUrl);

    const createResponse = await fetch(createUrl, {
      method: 'GET'
    });

    // console.log(createUrl)

    if (createResponse.ok) {

      const thisJson = await createResponse.json();
      const responseResults = JSON.parse(thisJson.response?.reply);
      // console.log ( 'got response results', responseResults );
      const tokenId = responseResults?.txpow?.body?.txn?.tokengen?.tokenid;
      console.log ( 'tokenid', tokenId );
      /* if ( tokenId ) {
        const listenerUrl =
        `${Remote.server}/${Remote.serverApiBase}=${Remote.addTokenListenerCommand}&${Remote.tokenParam}=${tokenId}`
        const encodedListener = encodeURI(listenerUrl);    
        // console.log('url: ', listenerUrl);
        const listenerResponse = await fetch(encodedListener, {
          method: 'GET'
        });

        if (listenerResponse.ok) {

          const txData = {
            code: "200",
            summary: Transaction.getSuccess,
            time: time
          }
          dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
        } else {
          const txData = {
            code: "400",
            summary: Transaction.getFailure,
            time: time
          }
          dispatch(write({data: txData})(TxActionTypes.TX_FAILURE))
        }
      } else {

        const txData = {
          code: "400",
          summary: Transaction.getFailure,
          time: time
        }
        dispatch(write({data: txData})(TxActionTypes.TX_FAILURE))

      }*/
    } else {
      const txData = {
        code: "400",
        summary: Transaction.getFailure,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_FAILURE))
    }
  };
}

export const send = (token: NewSend) => {
  return async (dispatch: AppDispatch) => {
    const time = new Date(Date.now()).toString();
    const pendingData: TxData = {
      code: '200',
      summary: Transaction.pending,
      time: time,
    };
    dispatch(write({data: pendingData})(TxActionTypes.TX_PENDING));

    const sendUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.sendCommand}&${Remote.amountParam}=${token.amount}&${Remote.addressParam}=${token.address}&${Remote.tokenParam}=${token.tokenid}`
    // const encodedSend = encodeURI(url);

    // console.log('send: ', token, 'url: ', url);

    const response = await fetch(sendUrl, {
      method: 'GET'
    });

    if (response.ok) {
      const txData = {
        code: "200",
        summary: Transaction.success,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
    } else {
      const txData = {
        code: "400",
        summary: Transaction.failure,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_FAILURE))

    }
  };
}

export const balance = () => {
  return async (dispatch: AppDispatch) => {
    const time = new Date(Date.now()).toString();
    const pendingData: TxData = {
      code: '200',
      summary: Transaction.pending,
      time: time,
    };
    dispatch(write({data: pendingData})(TxActionTypes.TX_PENDING));

    const balanceUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.balanceCommand}`
    //const encodedBalance = encodeURI(url);

    const response = await fetch(balanceUrl, {
      method: 'GET'
    });

    if (response.ok) {

      const thisJson = await response.json();
      const balances = JSON.parse(thisJson.response?.reply);
      const balanceData: BalanceProps = {
        data: []
      }      
      for( let i = 0; i < balances.balance?.length; i++ ) {    
        balanceData.data.push(balances.balance[i]);
      }
      dispatch(write({ data: balanceData.data })(BalanceActionTypes.GET_BALANCES))
      const txData = {
        code: "200",
        summary: Transaction.getSuccess,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
    } else {
      const txData = {
        code: "400",
        summary: Transaction.getFailure,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_FAILURE))
    }
  };
}

export const addresses = () => {
  return async (dispatch: AppDispatch) => {
    const time = new Date(Date.now()).toString();
    const pendingData: TxData = {
      code: '200',
      summary: Transaction.pending,
      time: time,
    };
    dispatch(write({data: pendingData})(TxActionTypes.TX_PENDING));

    const addressUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.scriptsCommand}`
    // const encodedBalance = encodeURI(addressUrl);

    const response = await fetch(addressUrl, {
      method: 'GET'
    });

    if (response.ok) {

      const thisJson = await response.json();
      const scripts = JSON.parse(thisJson.response?.reply);
      const scriptsData: AddressProps = {
        data: []
      }      
      for( let i = 0; i < scripts.addresses?.length; i++ ) { 
        const thisAddress: Address = scripts.addresses[i]; 
        if ( thisAddress.script.startsWith('RETURN SIGNEDBY ( 0x') ) {

          scriptsData.data.push(thisAddress);
        }
      }
      dispatch(write({ data: scriptsData.data })(AddressActionTypes.GET_ADDRESSES))
      const txData = {
        code: "200",
        summary: Transaction.getSuccess,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
    } else {
      const txData = {
        code: "400",
        summary: Transaction.getFailure,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_FAILURE))
    }
  };
}

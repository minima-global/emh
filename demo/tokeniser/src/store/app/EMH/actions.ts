import {Minima, Address} from 'minima';

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
 * Close app networking
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

      // dispatch(balance());
    };

    ws.onmessage = (evt: any) => {
      //Convert to JSON
      const jmsg = JSON.parse(evt.data);
      // console.log('Got message: ', jmsg);    
      if (jmsg.event == "newbalance") {  
        
        // console.log('Got balance message ', jmsg)        
        
        const balanceData: BalanceProps = {
          data: []
        }      
        for( let i = 0; i < jmsg.balance.length; i++ ) {    
          balanceData.data.push(jmsg.balance[i])
        }
    
        dispatch(write({ data: balanceData.data })(BalanceActionTypes.GET_BALANCES))
      } 

    }

    ws.onclose = async () => {
      console.log("Stopping WebSocket Listener @ " + Remote.websocketServer)
    }

    ws.onerror = (error: any) => {
      //let err = JSON.stringify(error);
      const err = JSON.stringify(error, ["message", "arguments", "type", "name", "data"]);
      // websocket is closed.
      console.log("Minima WS Listener Error ... ", err);
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

    // eslint-disable-next-line max-len
    // 127.0.0.1:9004/api/EMH/?command=tokenCreate&name=AnotherTest&amount=1&description="Another Test Token"&script="RETURN TRUE"&icon=""&proof=""
    // eslint-disable-next-line max-len
    const createUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.createTokenCommand}&${Remote.nameParam}="${token.name}"&${Remote.amountParam}=${token.amount}&${Remote.descriptionParam}="${token.description}"&${Remote.iconParam}="${token.icon}"&${Remote.proofParam}="${token.proof}"`
    const encodedCreate = encodeURI(createUrl);

    Minima.net.GET( encodedCreate, function ( reply ) {
      const results = JSON.parse(decodeURIComponent(reply.result));
      if ( results.status ) {
        const responseResults = JSON.parse(decodeURIComponent(results.response?.reply));
        console.log ( 'got response results', responseResults );
        const tokenId = responseResults?.txpow?.body?.txn?.tokengen?.tokenid;
        console.log ( 'tokenid', tokenId );
        if ( tokenId ) {
          const listenerUrl =
          `${Remote.server}/${Remote.serverApiBase}=${Remote.addTokenListenerCommand}&${Remote.tokenParam}=${tokenId}`
          const encodedListener = encodeURI(listenerUrl);    
          // console.log('url: ', listenerUrl);
          Minima.net.GET( encodedListener, function ( reply ) {
            // console.log('got reply for add listner', reply);
            const results = JSON.parse(decodeURIComponent(reply.result));
            if ( results.status ) {
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
          });
        } else {
          const txData = {
            code: "400",
            summary: Transaction.getFailure,
            time: time
          }
          dispatch(write({data: txData})(TxActionTypes.TX_FAILURE));
        }       

      } else {
        const txData = {
          code: "400",
          summary: Transaction.getFailure,
          time: time
        }
        dispatch(write({data: txData})(TxActionTypes.TX_FAILURE));
      }
    });
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

    // eslint-disable-next-line max-len
    // 127.0.0.1:9004/api/EMH/?command=tokenCreate&name=AnotherTest&amount=1&description="Another Test Token"&script="RETURN TRUE"&icon=""&proof=""
    // eslint-disable-next-line max-len
    const url =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.sendCommand}&${Remote.amountParam}=${token.amount}&${Remote.addressParam}=${token.address}&${Remote.tokenParam}=${token.tokenid}`
    const encodedSend = encodeURI(url);

    // console.log('send: ', token, 'url: ', url);

    const response = await fetch(encodedSend, {
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

    // eslint-disable-next-line max-len
    // 127.0.0.1:9004/api/EMH/?command=tokenCreate&name=AnotherTest&amount=1&description="Another Test Token"&script="RETURN TRUE"&icon=""&proof=""
    // eslint-disable-next-line max-len
    const url =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.balanceCommand}`
    const encodedBalance = encodeURI(url);

    Minima.net.GET( encodedBalance, function ( reply ) {
      // console.log('got reply ', reply);
      const results = JSON.parse(decodeURIComponent(reply.result));
      if ( results.status ) {
        const balances = JSON.parse(results.response?.reply);
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
    });
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

    // eslint-disable-next-line max-len
    // 127.0.0.1:9004/api/EMH/?command=tokenCreate&name=AnotherTest&amount=1&description="Another Test Token"&script="RETURN TRUE"&icon=""&proof=""
    // eslint-disable-next-line max-len
    const url =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.scriptsCommand}`
    const encodedBalance = encodeURI(url);

    Minima.net.GET( encodedBalance, function ( reply ) {
      const results = JSON.parse(decodeURIComponent(reply.result));
      if ( results.status ) {
        const scripts = JSON.parse(results.response?.reply);
        const scriptsData: AddressProps = {
          data: []
        }      
        for( let i = 0; i < scripts.addresses?.length; i++ ) { 
          const thisAddress: Address = scripts.addresses[i]; 
          if ( thisAddress.script.startsWith('RETURN+SIGNEDBY+(+0x') ) {
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
    });
  };
}

import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  NewSend,
  NewToken,
  BalanceProps,
  BalanceActionTypes,
  TxActionTypes,
  TxData,
} from '../../types';

import {
  App,
  Transaction,
  Remote,
  Post,
} from '../../../config';

import {write} from '../../actions';

// let ws: any;

/**
 * Close app networking
 * @return {function}
 
const closeNetwork = () => {
  return async (dispatch: AppDispatch) => {
    ws.close(); 
  };
};
*/

/**
 * Initialises app network
 const initNetwork = () => {
  return async (dispatch: AppDispatch) => {

    const addUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.addListenerCommand}&${Remote.idParam}=${App.minidappId}`;
    const encodedAdd = encodeURI(addUrl);

    const response = await fetch(encodedAdd, {
      method: 'GET'
    });

    if (response.ok) {

      console.log("Posted listener for " + App.minidappId);
      ws = new WebSocket(Remote.websocketServer);

      const removeUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.removeListenerCommand}&${Remote.idParam}=${App.minidappId}`;
      const encodedRemove = encodeURI(removeUrl);
      
      ws.onopen = async () => {
        //Connected
        console.log("Starting Shiny New WebSocket Listener @ " + Remote.websocketServer);

        //Now set the MiniDAPPID
        const uid = { "type":"minidappid", "minidappid": App.minidappId };

        //Send your name..
        ws.send(JSON.stringify(uid));

        dispatch(balance());
      };

      ws.onmessage = (evt: any) => {
        //Convert to JSON
        const jmsg = JSON.parse(evt.data);

        if (jmsg.event == "newbalance") {  
          
          console.log('Got balance message ', jmsg)        
          
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
        await fetch(encodedRemove, {
          method: 'GET'
        });
      }

      ws.onerror = (error: any) => {
        //let err = JSON.stringify(error);
        const err = JSON.stringify(error, ["message", "arguments", "type", "name", "data"]);
        // websocket is closed.
        console.log("Minima WS Listener Error ... ", err);
      }


    } else {

      console.error("Error posting listener for " + App.minidappId);
      
    }    
  };
};
*/

/**
 * Initialises the app
 * @return {function}
 */
export const init = () => {
  return async (dispatch: AppDispatch) => {

    // dispatch(initNetwork());
    Minima.init( function(msg) {
      if (msg.event == 'connected') {

        dispatch(balance());
        
      } else if (msg.event == "newbalance") {  
          
       //  console.log('Got balance message ', msg);     
        
        const balanceData: BalanceProps = {
          data: []
        }      
        for( let i = 0; i < msg.info.balance.length; i++ ) {    
          balanceData.data.push(msg.info.balance[i])
        }
    
        dispatch(write({ data: balanceData.data })(BalanceActionTypes.GET_BALANCES))
      } 
    });

  };
};

/**
 * Initialises the app
 * @return {function}
 */
 export const close = () => {
  return async (dispatch: AppDispatch) => {

    // dispatch(closeNetwork());
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
      `${Remote.server}/${Remote.serverApiBase}=${Remote.createTokenCommand}&${Remote.nameParam}="${token.name}"&${Remote.amountParam}=${token.amount}&${Remote.descriptionParam}="${token.description}"&${Remote.scriptParam}="${token.script}"&${Remote.iconParam}="${token.icon}"&${Remote.proofParam}="${token.proof}"`
    const encodedCreate = encodeURI(url);

    const response = await fetch(encodedCreate, {
      method: 'GET'
    });

    if (response.ok) {
      const txData = {
        code: "200",
        summary: Post.postSuccess,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
    } else {
      const txData = {
        code: "400",
        summary: Post.postFailure,
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
        summary: Post.postSuccess,
        time: time
      }
      dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
    } else {
      const txData = {
        code: "400",
        summary: Post.postFailure,
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
          summary: Post.postSuccess,
          time: time
        }
        dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
      } else {
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

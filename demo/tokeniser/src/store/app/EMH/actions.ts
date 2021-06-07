import {
  AppDispatch,
  ActionTypes,
  NewToken,
  Token,
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

/**
 * Initialises the app
 * @return {function}
 */
 export const initNetwork = () => {
  return async (dispatch: AppDispatch) => {

    const addUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.addListenerCommand}&${Remote.idParam}=${App.minidappId}`;
    const removeUrl =
      `${Remote.server}/${Remote.serverApiBase}=${Remote.removeListenerCommand}&${Remote.idParam}=${App.minidappId}`;
    
    const encodedAdd = encodeURI(addUrl);
    const encodedRemove = encodeURI(removeUrl);

    const response = await fetch(encodedAdd, {
      method: 'GET'
    });

    if (response.ok) {

      console.log("Posted listener for " + App.minidappId);

      const ws = new WebSocket(Remote.websocketServer);
      ws.onopen = async () => {
        //Connected
        console.log("Starting very new WebSocket Listener @ " + Remote.websocketServer);

        //Now set the MiniDAPPID
        const uid = { "type":"minidappid", "minidappid": App.minidappId };

        //Send your name..
        ws.send(JSON.stringify(uid));
      };

      ws.onmessage = (evt) => {
        //Convert to JSON
        const jmsg = JSON.parse(evt.data);
        console.log('Got message ', jmsg)

        /*
        if (jmsg.event == "newblock") {
          //Set the new status
          Minima.block   = parseInt(jmsg.txpow.header.block,10);
          Minima.txpow   = jmsg.txpow;

          //What is the info message
          info = { "txpow" : jmsg.txpow };

          //Post it
          MinimaPostMessage("newblock", info);

        } else if (jmsg.event == "newtransaction") {
          //What is the info message
          info = { "txpow" : jmsg.txpow, "relevant" : jmsg.relevant };

          //New Transaction
          MinimaPostMessage("newtransaction", info);

        } else if (jmsg.event == "newtxpow") {
          //What is the info message
          info = { "txpow" : jmsg.txpow };

          //New TxPoW
          MinimaPostMessage("newtxpow", info);

        } else if (jmsg.event == "newbalance") {
          //Set the New Balance
          Minima.balance = jmsg.balance;

          //What is the info message
          info = { "balance" : jmsg.balance };

          //Post it..
          MinimaPostMessage("newbalance", info);

        } else if (jmsg.event == "network") {
          //What type of message is it..
          if ( jmsg.details.action == "server_start" ||
            jmsg.details.action == "server_stop"  ||
            jmsg.details.action == "server_error") {

            sendCallback(MINIMA_SERVER_LISTEN, jmsg.details.port, jmsg.details);

          } else if ( jmsg.details.action == "client_new"  ||
                jmsg.details.action == "client_shut" ||
                jmsg.details.action == "message") {

            if (!jmsg.details.outbound) {
              sendCallback(MINIMA_SERVER_LISTEN, jmsg.details.port, jmsg.details);
            } else {
              sendCallback(MINIMA_USER_LISTEN, jmsg.details.hostport, jmsg.details);
            }
          } else if ( jmsg.details.action == "post") {
            //Call the MiniDAPP function..
            if (MINIMA_MINIDAPP_CALLBACK) {
              MINIMA_MINIDAPP_CALLBACK(jmsg.details);
            } else {
              Minima.minidapps.reply(jmsg.details.replyid, "ERROR - no minidapp interface found");
            }

          } else {
            Minima.log("UNKNOWN NETWORK EVENT : "+evt.data);
          }

        } else if (jmsg.event == "txpowstart") {
          info = { "transaction" : jmsg.transaction };
          MinimaPostMessage("miningstart", info);

          if (Minima.showmining) {
            Minima.notify("Mining Transaction Started..","#55DD55");
          }

        } else if (jmsg.event == "txpowend") {
          info = { "transaction" : jmsg.transaction };
          MinimaPostMessage("miningstop", info);

          if (Minima.showmining) {
            Minima.notify("Mining Transaction Finished","#DD5555");
          }
        }
        */
      }

      ws.onclose = async () => {
        await fetch(encodedRemove, {
          method: 'GET'
        });
    
        console.log("Minima WS Listener closed...attempting reconnect attempt in 10 seconds");

        //Start her up in a minute..
        setTimeout(function () { dispatch(initNetwork()); }, 10000);
      }

      ws.onerror = (error) => {
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

/**
 * Initialises the app
 * @return {function}
 */
export const init = () => {
  return async (dispatch: AppDispatch) => {

    dispatch(initNetwork());
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

    // console.log(encodedURL);

    /* Minima.net.GET(encodedURL, function(getResult) {
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
    */
  };
}

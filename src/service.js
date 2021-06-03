/* eslint-disable new-cap */
/* eslint-disable no-var */

// http://127.0.0.1:9004/api/EMH/?command=getDbase&table=LOGGING&sortField=ID&sortOrder=DESC&limitLow=0&offset=100
// 127.0.0.1:9004/api/EMH/?command=addTokenListener&token=0x00

const app = 'EMH';

const tables = {
  address: {
    name: 'ADDRESS',
    key: {
      name: ['ADDRESS', 'URL'],
      isAuto: false,
    },
    columns: ['ADDRESS', 'URL'],
  },
  token: {
    name: 'TOKEN',
    key: {
      name: ['TOKENID', 'URL'],
      isAuto: false,
    },
    columns: ['TOKENID', 'URL'],
  },
  txpow: {
    name: 'TXPOW',
    key: {
      name: ['TXID'],
      isAuto: false,
    },
    columns: ['TXID', 'URL', 'ADDRESS', 'TOKENID', 'DATE'],
  },
  log: {
    name: 'LOGGING',
    key: {
      name: ['ID'],
      isAuto: true,
    },
    columns: ['ID', 'LOGGINGTYPEID', 'LOGGINGTYPE', 'DATE', 'DATA'],
  },
  trigger: {
    name: 'API',
    key: {
      name: ['ENDPOINT'],
      isAuto: false,
    },
    columns: ['ENDPOINT', 'CMD', 'FORMAT', 'SETPARAMS', 'PARAMS', 'ISPUBLIC'],
  },
};

const extraLogTypes = {
  SYSTEM: 'SYSTEM',
  COMMAND: 'COMMAND',
  API: 'APICALL',
  URL: 'URLCALL',
};

const defaultAPI = {
  url: {
    endpoint: 'setDefaultURL',
    command: '',
    format: 'url',
    setParams: '',
    params: 'url=http://an.url.com',
    isPublic: 1,
  },
  address: {
    endpoint: 'addAddressListener',
    command: '',
    format: 'address [url]',
    setParams: '',
    params: 'address=MxQ37CGQPS6R7XI4JHCLNNVGWSZ66NVJ5E url=http://an.url.com',
    isPublic: 1,
  },
  token: {
    endpoint: 'addTokenListener',
    command: '',
    format: 'token [url]',
    setParams: '',
    params: 'token=0x9454BB52A5777D... url=http://an.url.com]',
    isPublic: 1,
  },
  dbase: {
    endpoint: 'getDbase',
    command: '',
    format: 'table sortField sortOrder limitLow offset',
    setParams: '',
    params: 'table=LOGGING sortField=ID sortOrder=DESC limitLow=0 offset=100',
    isPublic: 1,
  },
  send: {
    endpoint: 'send',
    command: 'send',
    format: 'amount address tokenid',
    setParams: '',
    params: 'amount=1 address=MxQ37CGQPS6R7XI4JHCLNNVGWSZ66NVJ5E tokenid=0x00',
    isPublic: 1,
  },
  tokenCreate: {
    endpoint: 'tokenCreate',
    command: 'tokencreate',
    format: 'name amount description [icon] [proof]',
    setParams: '',
    params: 'name=MyToken amount=1000000 description=token icon=http://my.icon.url proof=http://my.proof.url',
    isPublic: 1,
  },
};

var defaultURL = 'https://10b3db98-c5d7-4c4e-9a35-c4811eecbf70.mock.pstmn.io';
const maxURLFails = 3;
var failedURLCall = {};
// const deleteAfter = 1000 * 3600 * 24;
const deleteAfter = 300000;
const blockConfirmedDepth = 3;

/**
 * Runs supplied Minima SQL on given table
 * @function doSQL
 * @param {string} sql
 * @param {string} tableName
*/
function doSQL(sql, tableName) {
  Minima.sql(sql, function(resp) {
    if (!resp.status) {
      Minima.log(app + ' Error with SQL ' + tableName + resp.message);
    }
  });
}

/**
 * Creates log entries
 * @function doLog
 * @param {string} typeId
 * @param {string} type
 * @param {string} data
*/
function doLog(typeId, type, data) {
  const date = Date.now();
  const insertSQL = 'INSERT INTO ' +
      tables.log.name +
      ' (LOGGINGTYPEID, LOGGINGTYPE, DATE, DATA) ' +
      'VALUES (' +
      '\'' + typeId + '\', ' +
      '\'' + type + '\', ' +
      '\'' + date + '\', ' +
      '\'' + data + '\'' +
    ')';
  doSQL(insertSQL, tables.log.name);
}

/**
 * sets the default URL used when inserting tokens and addresses
 * @function setDefaultURL
 * @param {object} qParamsJSON
 * @param {string} replyId
*/
function setDefaultURL(qParamsJSON, replyId) {
  const endpoint = qParamsJSON.command;
  // Minima.log(app + ' API Call ' + endpoint);

  if ( endpoint == defaultAPI.url.endpoint ) {
    defaultURL=qParamsJSON.url;
    doLog('Default URL', extraLogTypes.SYSTEM, 'url: ' + url);
    Minima.minidapps.reply(replyId, 'OK');
  } else {
    Minima.minidapps.reply(replyId, '');
  }
}

/**
 * Creates address entries to listen for
 * @function insertAddress
 * @param {object} qParamsJSON
 * @param {string} replyId
*/
function insertAddress(qParamsJSON, replyId) {
  const endpoint = qParamsJSON.command;
  // Minima.log(app + ' API Call ' + endpoint);

  if ( endpoint == defaultAPI.address.endpoint ) {
    const address = qParamsJSON.address;
    var url = defaultURL;
    if ( qParamsJSON.url ) {
      url = qParamsJSON.url;
    }
    const insertSQL = 'INSERT IGNORE INTO ' +
        tables.address.name +
        ' (ADDRESS, URL) ' +
        'VALUES (' +
        '\'' + address + '\', ' +
        '\'' + url + '\'' +
      ')';
    doSQL(insertSQL, tables.address.name);
    Minima.minidapps.reply(replyId, 'OK');
  } else {
    Minima.minidapps.reply(replyId, '');
  }
}

/**
 * Creates token entries to listen for
 * @function insertToken
 * @param {object} qParamsJSON
 * @param {string} replyId
*/
function insertToken(qParamsJSON, replyId) {
  const endpoint = qParamsJSON.command;
  if ( endpoint == defaultAPI.token.endpoint ) {
    const token = qParamsJSON.token;
    var url = defaultURL;
    if ( qParamsJSON.url ) {
      url = qParamsJSON.url;
    }
    const insertSQL = 'INSERT IGNORE INTO ' +
        tables.token.name +
        ' (TOKENID, URL) ' +
        'VALUES (' +
        '\'' + token + '\', ' +
        '\'' + url + '\'' +
      ')';
    doSQL(insertSQL, tables.token.name);
    Minima.minidapps.reply(replyId, 'OK');
  } else {
    Minima.minidapps.reply(replyId, '');
  }
}

/**
 * Runs dbase queries
 * @function getDbase
 * @param {object} qParamsJSON
 * @param {string} replyId
*/
function getDbase(qParamsJSON, replyId) {
  const endpoint = qParamsJSON.command;
  if ( endpoint == defaultAPI.dbase.endpoint ) {
    const table = qParamsJSON.table;
    const sortField = qParamsJSON.sortField;
    const sortOrder = qParamsJSON.sortOrder;
    const limitLow = qParamsJSON.limitLow;
    const offset = qParamsJSON.offset;

    const querySQL = 'SELECT * FROM ' +
      table +
      ' ORDER BY ' +
      sortField + ' ' +
      sortOrder +
      ' LIMIT ' +
      limitLow + ', ' +
      offset;

    Minima.sql(querySQL, function(result) {
      if ( result.status ) {
        Minima.minidapps.reply(replyId,
            JSON.stringify(result.response.rows.slice()));
      } else {
        Minima.minidapps.reply(replyId, '');
      }
    });
  }
}

/**
 * Creates TxPow table
 * @function createTxPow
 */
function createTxPow() {
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tables.txpow.name + ' (' +
      'TXID VARCHAR(255) NOT NULL, ' +
      'URL VARCHAR(255), ' +
      'ADDRESS VARCHAR(255) NOT NULL, ' +
      'TOKENID VARCHAR(255) NOT NULL, ' +
      'DATE VARCHAR(255) NOT NULL, ' +
      'PRIMARY KEY(TXID, URL)' +
    ');';
  doSQL(createSQL, tables.txpow.name);
}

/**
 * Creates call table
 * @function createCall
 */
function createAddress() {
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tables.address.name + ' (' +
      'ADDRESS VARCHAR(255) NOT NULL, ' +
      'URL VARCHAR(255), ' +
      'PRIMARY KEY(ADDRESS, URL)' +
    ');';

  doSQL(createSQL, tables.address.name);
}

/**
 * Creates token table
 * @function createToken
 */
function createToken() {
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tables.token.name + ' (' +
      'TOKENID VARCHAR(255) NOT NULL, ' +
      'URL VARCHAR(255), ' +
      'PRIMARY KEY(TOKENID, URL)' +
    ');';

  doSQL(createSQL, tables.token.name);
}

/**
 * Creates trigger table
 * @function createTrigger
 */
function createTrigger() {
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tables.trigger.name + ' (' +
      'ENDPOINT VARCHAR(255) NOT NULL, ' +
      'CMD VARCHAR(255), ' +
      'FORMAT VARCHAR(255) NOT NULL, ' +
      'SETPARAMS VARCHAR(255), ' +
      'PARAMS VARCHAR(4096), ' +
      'ISPUBLIC BOOLEAN, ' +
      'PRIMARY KEY(ENDPOINT)' +
    ');';

  doSQL(createSQL, tables.trigger.name);
}

/**
 * Creates log table
 * @function createLog
 */
function createLog() {
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tables.log.name + ' (' +
      'ID INT PRIMARY KEY AUTO_INCREMENT, ' +
      'LOGGINGTYPEID VARCHAR(512) NOT NULL, ' +
      'LOGGINGTYPE VARCHAR(255) NOT NULL, ' +
      'DATE VARCHAR(255) NOT NULL, ' +
      'DATA VARCHAR(2048)' +
    ');';

  doSQL(createSQL, tables.log.name);
}

/**
 * Creates an API for adding default URL for token and address listeners
 * @function createURLAPI
 */
function createURLAPI() {
  const insertSQL = 'INSERT IGNORE INTO ' +
      tables.trigger.name +
      ' (ENDPOINT, CMD, FORMAT, SETPARAMS, PARAMS, ISPUBLIC) ' +
      'VALUES (' +
      '\'' + defaultAPI.url.endpoint + '\', ' +
      '\'' + defaultAPI.url.command + '\', ' +
      '\'' + defaultAPI.url.format + '\', ' +
      '\'' + defaultAPI.url.setParams + '\', ' +
      '\'' + defaultAPI.url.params + '\', ' +
      '\'' + defaultAPI.url.isPublic + '\'' +
    ')';
  doSQL(insertSQL, tables.log.name);
}

/**
 * Creates an API for adding Addresses for which you're interested
 * @function createAddressListenAPI
 */
function createAddressListenAPI() {
  const insertSQL = 'INSERT IGNORE INTO ' +
      tables.trigger.name +
      ' (ENDPOINT, CMD, FORMAT, SETPARAMS, PARAMS, ISPUBLIC) ' +
      'VALUES (' +
      '\'' + defaultAPI.address.endpoint + '\', ' +
      '\'' + defaultAPI.address.command + '\', ' +
      '\'' + defaultAPI.address.format + '\', ' +
      '\'' + defaultAPI.address.setParams + '\', ' +
      '\'' + defaultAPI.address.params + '\', ' +
      '\'' + defaultAPI.address.isPublic + '\'' +
    ')';
  doSQL(insertSQL, tables.log.name);
}

/**
 * Creates an API for adding Tokens for which you're interested
 * @function createTokenListenAPI
 */
function createTokenListenAPI() {
  const insertSQL = 'INSERT IGNORE INTO ' +
      tables.trigger.name +
      ' (ENDPOINT, CMD, FORMAT, SETPARAMS, PARAMS, ISPUBLIC) ' +
      'VALUES (' +
      '\'' + defaultAPI.token.endpoint + '\', ' +
      '\'' + defaultAPI.token.command + '\', ' +
      '\'' + defaultAPI.token.format + '\', ' +
      '\'' + defaultAPI.token.setParams + '\', ' +
      '\'' + defaultAPI.token.params + '\', ' +
      '\'' + defaultAPI.token.isPublic + '\'' +
    ')';
  doSQL(insertSQL, tables.log.name);
}

/**
 * Creates an API for making it possible to get data out of the database
 * @function createGetDbaseAPI
 */
function createGetDbaseAPI() {
  const insertSQL = 'INSERT IGNORE INTO ' +
      tables.trigger.name +
      ' (ENDPOINT, CMD, FORMAT, SETPARAMS, PARAMS, ISPUBLIC) ' +
      'VALUES (' +
      '\'' + defaultAPI.dbase.endpoint + '\', ' +
      '\'' + defaultAPI.dbase.command + '\', ' +
      '\'' + defaultAPI.dbase.format + '\', ' +
      '\'' + defaultAPI.dbase.setParams + '\', ' +
      '\'' + defaultAPI.dbase.params + '\', ' +
      '\'' + defaultAPI.dbase.isPublic + '\'' +
    ')';
  doSQL(insertSQL, tables.log.name);
}

/**
 * Creates an API for making it possible to send transactions
 * @function createSendAPI
 */
function createSendAPI() {
  const insertSQL = 'INSERT IGNORE INTO ' +
      tables.trigger.name +
      ' (ENDPOINT, CMD, FORMAT, SETPARAMS, PARAMS, ISPUBLIC) ' +
      'VALUES (' +
      '\'' + defaultAPI.send.endpoint + '\', ' +
      '\'' + defaultAPI.send.command + '\', ' +
      '\'' + defaultAPI.send.format + '\', ' +
      '\'' + defaultAPI.send.setParams + '\', ' +
      '\'' + defaultAPI.send.params + '\', ' +
      '\'' + defaultAPI.send.isPublic + '\'' +
    ')';
  doSQL(insertSQL, tables.log.name);
}

/**
 * Creates an API for making it possible to create tokens
 * @function createAddressListenAPI
 */
function createTokenAPI() {
  const insertSQL = 'INSERT IGNORE INTO ' +
      tables.trigger.name +
      ' (ENDPOINT, CMD, FORMAT, SETPARAMS, PARAMS, ISPUBLIC) ' +
      'VALUES (' +
      '\'' + defaultAPI.tokenCreate.endpoint + '\', ' +
      '\'' + defaultAPI.tokenCreate.command + '\', ' +
      '\'' + defaultAPI.tokenCreate.format + '\', ' +
      '\'' + defaultAPI.tokenCreate.setParams + '\', ' +
      '\'' + defaultAPI.tokenCreate.params + '\', ' +
      '\'' + defaultAPI.tokenCreate.isPublic + '\'' +
    ')';
  doSQL(insertSQL, tables.log.name);
}

/**
 * Calls external URL
 * @function processURL
 * @param {string} txId
 * @param {string} uRL
 * @param {string} address
 * @param {string} tokenId
 * @param {string} state
*/
function processURL(txId, uRL, address, tokenId, state) {
  // Minima.log(
  //  app + ' URL Call ' + uRL + ' ' + address + ' ' + tokenId + ' ' + state
  // );
  const postData = {
    txId: txId,
    address: address,
    tokenId: tokenId,
    state: state,
  };

  const deleteSQL = 'DELETE FROM ' +
            tables.txpow.name +
            ' WHERE (TXID, URL) = ' +
            '(\'' + txId + '\', ' +
            '\'' + uRL + '\')';

  Minima.net.POST(uRL, JSON.stringify(postData), function(postResults) {
    // Minima.log(app + ' POST results ' + JSON.stringify(postResults));
    if ( postResults.result == 'OK' ) {
      doLog(uRL, extraLogTypes.URL, txId);
      doSQL(deleteSQL, tables.txpow.name);
      doLog(txId, tables.txpow.name, 'delete');
    } else {
      doLog(uRL, extraLogTypes.URL, 'FAIL ' + txId);
      failedURLCall[uRL].count += 1;
      if ( failedURLCall[uRL].count == maxURLFails ) {
        doSQL(deleteSQL, tables.txpow.name);
        doLog(txId, tables.txpow.name, 'delete');
        failedURLCall = {};
      }
    }
  });
}

/**
 * Spins through entries in the TxPoW table, and calls URLs for any valid TX
 * that are at least 3 blocks deep. Also cleans up any old TxPow entries
 * @function processTxPow
 * @param {number} blockTime
*/
function processTxPow(blockTime) {
  // Minima.log(app + ' here! ' + blockTime);
  const now = +new Date();
  const txPowSelectSQL = 'SELECT TXID, URL, ADDRESS, TOKENID, DATE FROM ' +
      tables.txpow.name;
  Minima.sql(txPowSelectSQL, function(txPowResults) {
    if (txPowResults.response) {
      for (var i = 0; i < txPowResults.response.count; i++ ) {
        var txPow = txPowResults.response.rows[i];
        // Minima.log(app + ' txpow response ' + JSON.stringify(txPow));
        var deleteSQL = 'DELETE FROM ' +
            tables.txpow.name +
            ' WHERE (TXID, URL) = ' +
            '(\'' + txPow.TXID + '\', ' +
            '\'' + txPow.URL + '\')';

        if ((now - txPow.DATE) > deleteAfter) {
          doSQL(deleteSQL, tables.txpow.name);
          doLog(txPow.TXID, tables.txpow.name, 'delete');
        } else {
          const txPowInfo = 'txpowinfo ' + txPow.TXID;
          Minima.cmd(txPowInfo, function(infoResults) {
          // Minima.log(app + ' pow ' + JSON.stringify(infoResults));
            const infoResponse = infoResults.response;
            if ( infoResponse.isinblock &&
               blockTime - infoResponse.inblock >= blockConfirmedDepth ) {
              const urlFailed = failedURLCall[txPow.URL];
              if ( !urlFailed ) {
                const missedCount = {
                  count: 0,
                };
                failedURLCall[txPow.URL] = missedCount;
              }
              processURL(
                  txPow.TXID,
                  txPow.URL,
                  txPow.ADDRESS,
                  txPow.TOKENID,
                  JSON.stringify(infoResponse.txpow.body.txn.state));
            }
          });
        }
      }
    }
  });
}

/**
 * Adds relevant tx to txpow table, including
 * the relevant tokenid and associated URL call(s)
 * @function processTokenTx
 * @param {string} txId
 * @param {string} tokenId
 * @param {string} mxAddress
*/
function processTokenTx(txId, tokenId, mxAddress) {
  const tokenSelectSQL = 'SELECT URL FROM ' +
    tables.token.name +
    ' WHERE TOKENID = \'' +
    tokenId +
    '\'';

  Minima.sql(tokenSelectSQL, function(tokenResults) {
    if (tokenResults.response) {
      for (var i = 0; i < tokenResults.response.count; i++ ) {
        // Minima.log(app + ' token response ' + JSON.stringify(tokenResults));
        const date = Date.now();
        const insertSQL = 'INSERT INTO ' +
          tables.txpow.name +
          ' (TXID, URL, ADDRESS, TOKENID, DATE) ' +
          'VALUES (' +
          '\'' + txId + '\', ' +
          '\'' + tokenResults.response.rows[i].URL + '\', ' +
          '\'' + mxAddress + '\', ' +
          '\'' + tokenId + '\', ' +
          '\'' + date + '\'' +
        ')';

        doSQL(insertSQL, tables.txpow.name);
        doLog(txId, tables.txpow.name, 'insert ' +
            tokenId + ' ' +
            tokenResults.response.rows[i].URL);
      }
    }
  });
}

/**
 * Adds relevant tx to txpow table, including
 * the relevant MxAddress and associated URL call(s)
 * @function processAddressTx
 * @param {string} txId
 * @param {string} tokenId
 * @param {string} mxAddress
*/
function processAddressTx(txId, tokenId, mxAddress) {
  const addressSelectSQL = 'SELECT URL FROM ' +
      tables.address.name +
        ' WHERE ADDRESS = \'' +
        mxAddress +
        '\'';

  Minima.sql(addressSelectSQL, function(mxResults) {
    if (mxResults.response) {
      for (var i = 0; i < mxResults.response.count; i++ ) {
        const date = Date.now();
        // Minima.log(app + ' response ' + JSON.stringify(mxResults));
        const insertSQL = 'INSERT INTO ' +
              tables.txpow.name +
              ' (TXID, URL, ADDRESS, TOKENID, DATE) ' +
              'VALUES (' +
              '\'' + txId + '\', ' +
              '\'' + mxResults.response.rows[i].URL + '\', ' +
              '\'' + mxAddress + '\', ' +
              '\'' + tokenId + '\', ' +
              '\'' + date + '\'' +
            ')';

        doSQL(insertSQL, tables.txpow.name);
        doLog(txId, tables.txpow.name, 'insert ' +
                mxAddress + ' ' +
                mxResults.response.rows[i].URL);
      }
    }
  });
}

/**
 * Adds relevant tx to txpow table, including either
 * the relevant tokenid and/or MXaddress and any associated URLs
 * @function processTx
 * @param {string} txId
 * @param {string} tokenId
 * @param {string} mxAddress
*/
function processTx(txId, tokenId, mxAddress) {
  processTokenTx(txId, tokenId, mxAddress);
  processAddressTx(txId, tokenId, mxAddress);
}

/**
 * Processes any URL call call
 * @function processApiCall
 * @param {string} qParams
 * @param {string} replyId
*/
function processApiCall(qParams, replyId) {
  const qParamsJSON = JSON.parse(decodeURIComponent(qParams));
  const endpoint = qParamsJSON.command;
  // Minima.log(app + ' API Call ' + endpoint);
  if ( endpoint ) {
    if ( endpoint == defaultAPI.address.endpoint ) {
      insertAddress(qParamsJSON, replyId);
    } else if ( endpoint == defaultAPI.token.endpoint ) {
      insertToken(qParamsJSON, replyId);
    } else if ( endpoint == defaultAPI.dbase.endpoint ) {
      getDbase(qParamsJSON, replyId);
    } else if ( endpoint == defaultAPI.url.endpoint ) {
      setDefaultURL(qParamsJSON, replyId);
    } else {
      const commandSelectSQL =
        'SELECT CMD, FORMAT, SETPARAMS, PARAMS, ISPUBLIC FROM ' +
        tables.trigger.name +
          ' WHERE ENDPOINT = \'' +
          endpoint +
      '\'';
      // Minima.log(commandSelectSQL);
      Minima.sql(commandSelectSQL, function(endpointResults) {
        // Minima.log(JSON.stringify(endpointResults));
        if (endpointResults.response && endpointResults.response.count) {
          if ( endpointResults.response.rows[0].ISPUBLIC == 'true' ) {
            var command = endpointResults.response.rows[0].CMD;

            if ( endpointResults.response.rows[0].FORMAT ) {
              const format = (
                endpointResults.response.rows[0].FORMAT).split(' ');

              var setParams = [];
              var setParamKeys = [];
              var setParamValues = [];
              if ( endpointResults.response.rows[0].SETPARAMS ) {
                setParams = (
                  endpointResults.response.rows[0].SETPARAMS).split(' ');
                for ( var i = 0; i < setParams.length; i++ ) {
                  var tuple = setParams[i].split('=');
                  setParamKeys.push(tuple[0]);
                  setParamValues.push(tuple[1]);
                }
              }

              for ( var j = 0; j < format.length; j++ ) {
                var setIndex = setParamKeys.indexOf(format[j]);
                if ( setIndex !== -1 ) {
                  command += ' ' + setParamValues[setIndex];
                } else {
                  command += ' ' + qParamsJSON[format[j]];
                }
              }
            }

            // Minima.log(app + ' command ' + command);
            Minima.cmd(command, function(msg) {
              if ( msg.status ) {
                doLog(endpoint, extraLogTypes.API, command);
                // Reply..
                Minima.minidapps.reply(replyId, JSON.stringify(msg.response));
              } else {
                Minima.log(app + ' Error with API Call ' + endpoint);
                Minima.minidapps.reply(replyId, '');
              }
            });
          } else {
            Minima.minidapps.reply(replyId, '');
          }
        } else {
          Minima.minidapps.reply(replyId, '');
        }
      });
    }
  }
}

/** @function initDbase */
function initDbase() {
  createTxPow();
  createAddress();
  createToken();
  createTrigger();
  createLog();
}

/** @function createDefaultAPI */
function createDefaultAPI() {
  createURLAPI();
  createAddressListenAPI();
  createTokenListenAPI();
  createGetDbaseAPI();
  createSendAPI();
  createTokenAPI();
}

/** Initialise the app */
Minima.init( function(msg) {
  if (msg.event == 'connected') {
    doLog('Bootstrap', extraLogTypes.SYSTEM, 'init');

    initDbase();
    createDefaultAPI();

    // Listen for messages posted to this service
    Minima.minidapps.listen(function(msg) {
      // process the call
      processApiCall(msg.message, msg.replyid);
    });
  } else if (msg.event == 'newtxpow') {
    const txPoW = msg.info.txpow;
    const txOutputs = txPoW.body.txn.outputs;
    if ( ( Array.isArray(txOutputs) ) &&
        ( txOutputs.length ) ) {
      processTx(txPoW.txpowid, txOutputs[0].tokenid, txOutputs[0].mxaddress);
    }
  } else if (msg.event == 'newblock') {
    // Minima.log(app + ' msg ' + JSON.stringify(msg));
    const blockTime = parseInt(msg.info.txpow.header.block, 10);
    processTxPow(blockTime);
  }
});

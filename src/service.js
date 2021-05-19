/* eslint-disable new-cap */
/* eslint-disable no-var */
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
    name: 'LOG',
    key: {
      name: ['ID'],
      isAuto: true,
    },
    columns: ['ID', 'LOGGINGTYPEID', 'LOGGINGTYPE', 'DATE', 'DATA'],
  },
  trigger: {
    name: 'TRIGGER',
    key: {
      name: ['ENDPOINT'],
      isAuto: false,
    },
    columns: ['ENDPOINT', 'COMMAND', 'SETPARAMS', 'PARAMS'],
  },
};

const extraLogTypes = {
  COMMAND: 'COMMAND',
  URL: 'URL',
};

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
      'COMMAND VARCHAR(255) NOT NULL, ' +
      'SETPARAMS VARCHAR(255), ' +
      'PARAMS VARCHAR(255), ' +
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
      'DATA VARCHAR(1024), ' +
      'PRIMARY KEY(ID)' +
    ');';

  doSQL(createSQL, tables.log.name);
}

/** @function initDbase */
function initDbase() {
  createTxPow();
  createAddress();
  createToken();
  createTrigger();
  createLog();
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
  // Minima.log(app + ' URL Call ' + uRL + ' ' + address + ' ' + tokenId + ' ' + state);
  const postData = {
    address: address,
    tokenId: tokenId,
    state: state,
  };
  Minima.net.POST(uRL, JSON.stringify(postData), function(postResults) {
    // Minima.log(app + ' POST results ' + JSON.stringify(postResults));
    if ( postResults.result == 'OK' ) {
      doLog(uRL, extraLogTypes.URL, 'OK');
      const deleteSQL = 'DELETE FROM ' +
            tables.txpow.name +
            ' WHERE (TXID, URL) = ' +
            '(\'' + txId + '\', ' +
            '\'' + uRL + '\')';
      doSQL(deleteSQL, tables.txpow.name);
      doLog(txId, tables.txpow.name, 'delete');
    } else {
      doLog(uRL, extraLogTypes.URL, 'FAIL');
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
    // Minima.log(app + ' txpow response ' + JSON.stringify(txPowResults));
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
  });
}

/**
 * Adds relevant tx to txpow table, including either
 * the relevant tokenid or Minima Address
 * @function processTx
 * @param {string} txId
 * @param {string} tokenId
 * @param {string} mxAddress
*/
function processTx(txId, tokenId, mxAddress) {
  // try the token, first
  const tokenSelectSQL = 'SELECT URL FROM ' +
    tables.token.name +
    ' WHERE TOKENID = \'' +
    tokenId +
    '\'';

  Minima.sql(tokenSelectSQL, function(tokenResults) {
    if (tokenResults.response.count) {
      for (var i = 0; i < tokenResults.response.count; i++ ) {
        // Minima.log(app + ' token response ' + JSON.stringify(tokenResults));
        const date = Date.now();
        const insertSQL = 'INSERT INTO ' +
          tables.txpow.name +
          ' (TXID, URL, ADDRESS, TOKENID, DATE) ' +
          'VALUES (' +
          '\'' + txId + '\', ' +
          '\'' + tokenResults.response.rows[i].URL + '\', ' +
          '\'\', ' +
          '\'' + tokenId + '\', ' +
          '\'' + date + '\'' +
        ')';

        doSQL(insertSQL, tables.txpow.name);
        doLog(txId, tables.txpow.name, 'insert ' +
            tokenId + ' ' +
            tokenResults.response.rows[i].URL);
      }
    } else {
      // try the address
      const addressSelectSQL = 'SELECT URL FROM ' +
      tables.address.name +
        ' WHERE ADDRESS = \'' +
        mxAddress +
        '\'';

      Minima.sql(addressSelectSQL, function(mxResults) {
        if (mxResults.response.count) {
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
              '\'\', ' +
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
  });
}

/** Initialise the app */
Minima.init( function(msg) {
  if (msg.event == 'connected') {
    initDbase();
  } else if (msg.event == 'newtxpow') {
    const txPoW = msg.info.txpow;
    const txOutputs = txPoW.body.txn.outputs;
    // txOutputs[0].address
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

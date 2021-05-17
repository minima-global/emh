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
    columns: ['TXID'],
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

/**
 * Runs supplied Minima SQL on given table
 * @function doSQL
 * @param {string} sql
 * @param {string} tableName
*/
function doSQL(sql, tableName) {
  Minima.sql(sql, function(resp) {
    Minima.log(app + ' response ' + JSON.stringify(resp));
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
  const tableName = tables.log.name;
  const date = Date.now();
  const insertSQL = 'INSERT INTO ' +
      tableName +
      ' (LOGGINGTYPEID, LOGGINGTYPE, DATE, DATA) ' +
      'VALUES (' +
      '\'' + typeId + '\', ' +
      '\'' + type + '\', ' +
      '\'' + date + '\', ' +
      '\'' + data + '\'' +
    ')';
  doSQL(insertSQL, tableName);
}

/**
 * Creates TxPow table
 * @function createTxPow
 */
function createTxPow() {
  const tableName = tables.txpow.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'TXID VARCHAR(255) NOT NULL, ' +
      'PRIMARY KEY(TXID)' +
    ');';
  doSQL(createSQL, tableName);
}

/**
 * Creates call table
 * @function createCall
 */
function createAddress() {
  const tableName = tables.address.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'ADDRESS VARCHAR(255) NOT NULL, ' +
      'URL VARCHAR(255), ' +
      'PRIMARY KEY(ADDRESS, URL)' +
    ');';

  doSQL(createSQL, tableName);
}

/**
 * Creates token table
 * @function createToken
 */
function createToken() {
  const tableName = tables.token.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'TOKENID VARCHAR(255) NOT NULL, ' +
      'URL VARCHAR(255), ' +
      'PRIMARY KEY(TOKENID, URL)' +
    ');';

  doSQL(createSQL, tableName);
}

/**
 * Creates trigger table
 * @function createTrigger
 */
function createTrigger() {
  const tableName = tables.trigger.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'ENDPOINT VARCHAR(255) NOT NULL, ' +
      'COMMAND VARCHAR(255) NOT NULL, ' +
      'SETPARAMS VARCHAR(255), ' +
      'PARAMS VARCHAR(255), ' +
      'PRIMARY KEY(ENDPOINT)' +
    ');';

  doSQL(createSQL, tableName);
}

/**
 * Creates log table
 * @function createLog
 */
function createLog() {
  const tableName = tables.log.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'ID INT PRIMARY KEY AUTO_INCREMENT, ' +
      'LOGGINGTYPEID VARCHAR(512) NOT NULL, ' +
      'LOGGINGTYPE VARCHAR(255) NOT NULL, ' +
      'DATE VARCHAR(255) NOT NULL, ' +
      'DATA VARCHAR(1024), ' +
      'PRIMARY KEY(ID)' +
      ')';

  doSQL(createSQL, tableName);
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
 * Adds relevant txpows to TxPow table
 * @function addTxPoW
 * @param {object} txpow
*/
function addTxPoW(txpow) {
  const txOutputs = txpow.body.txn.outputs;
  if ( ( Array.isArray(txOutputs) ) &&
        ( txOutputs.length ) ) {
    const id = txpow.txpowid;
    const tableName = tables.txpow.name;
    const insertSQL = 'INSERT INTO ' +
      tableName +
      ' (TXID) ' +
      'VALUES (' +
      '\'' + id + '\'' +
    ')';

    doSQL(insertSQL, tableName);
    doLog(id, tables.txpow.name, 'insert');
  }
}

/** Initialise the app */
Minima.init( function(msg) {
  if (msg.event == 'connected') {
    initDbase();
  } else if (msg.event == 'newtxpow') {
    addTxPoW(msg.info.txpow);
  }
});

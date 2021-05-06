const app = 'EMH';

const tables = {
  action: {
    name: 'action',
  },
  txpow: {
    name: 'txpow',
  },
  log: {
    name: 'log',
  },
  logType: {
    name: 'logtype',
  },
  trigger: {
    name: 'trigger',
  },
  url: {
    name: 'url',
  },
};

const logTypes = {
  ACTION: 'Action',
  TXPOW: 'TxPoW',
  TRIGGER: 'Trigger',
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
    if (!resp.status) {
      Minima.log(app + ' Error with SQL ' + tableName + resp.message);
    } else {
      Minima.log(app + ' SQL ' + tableName);
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
      ' (loggingTypeId, loggingType, date, data) ' +
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
      'id varchar(255) NOT NULL, ' +
      'PRIMARY KEY(id)' +
    ');';
  doSQL(createSQL, tableName);
}

/**
 * Creates action table
 * @function createAction
 */
function createAction() {
  const tableName = tables.action.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'address varchar(255) NOT NULL, ' +
      'params varchar(255) NOT NULL, ' +
      'url varchar(255) NOT NULL, ' +
      'PRIMARY KEY(address)' +
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
      'name varchar(255) NOT NULL, ' +
      'command varchar(255) NOT NULL, ' +
      'setParams varchar(255) NOT NULL, ' +
      'params varchar(255) NOT NULL, ' +
      'protocol varchar(255) NOT NULL, ' +
      'url varchar(255) NOT NULL, ' +
      'PRIMARY KEY(name)' +
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
      'id INT PRIMARY KEY AUTO_INCREMENT, ' +
      'loggingTypeId varchar(255) NOT NULL, ' +
      'loggingType varchar(255) NOT NULL, ' +
      'date varchar(255) NOT NULL, ' +
      'data varchar(1024) NOT NULL, ' +
      'PRIMARY KEY(id)' +
      ')';

  doSQL(createSQL, tableName);
}

/**
 * Creates URL table
 * @function createURL
 */
function createURL() {
  const tableName = tables.url.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'name varchar(255) NOT NULL, ' +
      'triggername varchar(255) NOT NULL, ' +
      'PRIMARY KEY(name), ' +
      'FOREIGN KEY (triggername) REFERENCES trigger(name)' +
    ');' +
    'CREATE INDEX IF NOT EXISTS arrange_index ON ' +
    tableName + '(triggername)';
  doSQL(createSQL, tableName);
}

/** @function initDbase */
function initDbase() {
  createTxPow();
  createAction();
  createTrigger();
  createURL();
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
      ' (id) ' +
      'VALUES (' +
      '\'' + id + '\'' +
    ')';

    doSQL(insertSQL, tableName);
    doLog(id, logTypes.TXPOW, 'insert');
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

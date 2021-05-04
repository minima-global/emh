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
 * @function doInsert
 * @param {string} sql
 * @param {string} tableName
*/
function doInsert(sql, tableName) {
  Minima.sql(sql, function(resp) {
    if (!resp.status) {
      Minima.log(app + 'Error with insert row ' + tableName + resp.message);
    }
  });
}

/**
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
      typeId + ', ' + type + ', ' + date + ', ' + data +
    ')';
  doInsert(insertSQL, tableName);
}

/**
 * @function doCreate
 * @param {string} sql
 * @param {string} tableName
*/
function doCreate(sql, tableName) {
  Minima.sql(sql, function(resp) {
    if (!resp.status) {
      Minima.log(app + 'Error with create table ' + tableName + resp.message);
    }
  });
}

/** @function createTxPow */
function createTxPow() {
  const tableName = tables.txpow.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'id varchar(255) NOT NULL, ' +
      'PRIMARY KEY(id)' +
    ');';
  doCreate(createSQL, tableName);
}

/** @function createAction */
function createAction() {
  const tableName = tables.action.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'address varchar(255) NOT NULL, ' +
      'params varchar(255) NOT NULL, ' +
      'url varchar(255) NOT NULL, ' +
      'PRIMARY KEY(address)' +
    ');';

  doCreate(createSQL, tableName);
}

/** @function createTriggers */
function createTrigger() {
  const tableName = tables.endpoint.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'name varchar(255) NOT NULL, ' +
      'command varchar(255) NOT NULL, ' +
      'setParams varchar(255) NOT NULL, ' +
      'params varchar(255) NOT NULL, ' +
      'protocol varchar(255) NOT NULL, ' +
      'url varchar(255) NOT NULL, ' +
      'PRIMARY KEY(address)' +
    ');';

  doCreate(createSQL, tableName);
}

/** @function createLog */
function createLog() {
  const tableName = tables.log.name;
  const createSQL = 'CREATE Table IF NOT EXISTS ' +
      tableName + ' (' +
      'id INT PRIMARY KEY AUTO_INCREMENT, ' +
      'loggingTypeId varchar(255) NOT NULL, ' +
      'loggingType varchar(255) NOT NULL, ' +
      'date varchar(255) NOT NULL, ' +
      'data varchar(1024) NOT NULL, ';
  'PRIMARY KEY(id)' +
    ')';

  doCreate(createSQL, tableName);
}

/** @function initDbase */
function initDbase() {
  createTxPow();
  createAction();
  createTrigger();
  createLog();
}

/**
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
      id +
    ')';

    doInsert(insertSQL, tableName);
    doLog(id, logTypes.TxPoW, 'insert ' + id);
  }
}

Minima.init( function(msg) {
  if (msg.event == 'connected') {
    initDbase();
  } else if (msg.event == 'newtxpow') {
    addTxPoW(msg.info.txpow);
  }
});

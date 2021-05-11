/** @class Misc */
class Misc {
    static readonly successLoginDelay = 1500
    static readonly referralDelay = 4500
}

/** @class Smtp */
class Smtp {
  static readonly token = 'bcffc60c-e73d-4e79-9611-a5349751fd8c'
}

/** @class Dbase */
class Dbase {
  static readonly tables = {
    call: {
      name: 'call',
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

  static readonly logTypes = {
    ACTION: 'Action',
    TXPOW: 'TxPoW',
    TRIGGER: 'Trigger',
    URL: 'URL',
  };
}

export {Misc, Smtp, Dbase};

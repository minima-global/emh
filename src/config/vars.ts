import {
  ChartType,
  LogType,
} from '../store/types';

import {colours} from './colours';

/** @class App */
class App {
  static readonly title = 'Minima'
  static readonly subTitle = 'The evolution will not be centralised'
  static readonly appName = 'Minima Enterprise Gateway'
  static readonly catchLine = `Powered by ${App.title}`
  static readonly tagline = ''
  static readonly website = 'http://www.minima.global'
  static readonly copyright = '© Copyright 2021 Minima GmbH'
  static readonly author = 'Dr Steve Huckle'
  static readonly enquiries = 'Minima Community Team'
  static readonly email = 'community@minima.global'
  static readonly bugEmail = 'minima-global@fire.fundersclub.com'
  static readonly version = '0.3.1'
  static readonly release = 'Testnet'
}

/** @class Misc */
class Misc {
  static readonly totalDecimals = 4
  static readonly amountDecimals = 4
  static readonly priceDecimals = 4
  static readonly mempoolDecimals = 2
  static readonly unconfirmedDecimals = 2
  static readonly confirmedDecimals = 4
  static readonly sendableDecimals = 4

  static readonly barThickness = 30;
  static readonly labelOffset = -20;
}

/** @class Smtp */
class Smtp {
  static readonly token = 'bcffc60c-e73d-4e79-9611-a5349751fd8c'
}

/** @class Dbase */
class Dbase {
  static readonly tables = {
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
      columns: ['ID', 'DATE', 'LOGGINGTYPE', 'ACTION', 'DATA'],
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

  static readonly extraLogTypes = {
    SYSTEM: 'SYSTEM',
    COMMAND: 'COMMAND',
    API: 'APICALL',
    URL: 'URLCALL',
  };

  static readonly defaultAPI = {
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
    gimme50: {
      endpoint: 'gimme50',
      command: 'send',
      format: 'amount address tokenid',
      setParams: 'amount=50 tokenid=0x00',
      params: 'address=MxQ37CGQPS6R7XI4JHCLNNVGWSZ66NVJ5E',
      isPublic: 1,
    },
    send: {
      endpoint: 'send',
      command: 'send',
      format: 'amount address tokenid',
      setParams: '',
      params: 'amount=1 address=Mx... tokenid=0x00',
      isPublic: 1,
    },
    tokenCreate: {
      endpoint: 'tokenCreate',
      command: 'tokencreate',
      format: 'name amount description script icon proof',
      setParams: '',
      params: 'name=MyToken amount=1000000 description="Token description" script="RETURN TRUE" icon="http://my.icon.url" proof="http://my.proof.url"',
      isPublic: 1,
    },
  };

  static readonly defaultActions = {
    init: 'bootstrap',
    run: 'run',
    insert: 'insert',
    delete: 'delete',
    update: 'update',
    callSuccess: 'call',
    callFail: 'fail',
  };

  static readonly maxLimit = 2147483647
  static readonly pageLimit = 25
}


/** @class Paths */
class Paths {
  static readonly home = 'Dashboard'
  static readonly about = 'About'
  static readonly help = 'Help'
  static readonly contact = 'Contact'

  static readonly logs = 'Logs'
  static readonly urls = 'Minima to URL'
  static readonly addresses = 'Addresses'
  static readonly tokens = 'Tokens'
  static readonly triggers = 'API'
  static readonly cmd = 'Run API'
}

/** @class GeneralError */
class GeneralError {
  static readonly required = 'Required'
  static lengthError255 = 'Cannot be longer than 255 characters'
  static lengthError1024 = 'Cannot be longer than 1024 characters'
}

/** @class Home */
class Home {
  static readonly heading = `Dashboard`
}

/** @class Welcome */
class Welcome {
  static readonly heading = 'Welcome'
}

/** @class About */
class About {
  static readonly heading = 'About'
  static readonly info = [`Version ${App.version}.`,
    `${App.catchLine}.`,
    `${App.release}.`,
    `Created by ${App.author}.`,
    `${App.copyright}.`,
  ]
}

/** @class Help */
class Help {
  static readonly heading = 'Help'

  static readonly info = [`Coming soon.`]

  static readonly homeTip = 'Home'
  static readonly helpTip = 'Help'
  static readonly contactTip = 'Contact'
  static readonly aboutTip = 'About'
  static readonly sortTip = 'Sort'
}

/** @class Contact */
class Contact {
  static readonly heading = 'Contact'

  static readonly info = [
    'To report a technical problem,' +
    'please email a brief description of the issue to' +
    `${App.bugEmail}.`,
    `For all other enquires, please email ${App.enquiries} at ${App.email}.`,
  ]
}

/** @class Cmd */
class Cmd {
  static readonly heading = 'Run API Command'
  static readonly chartHeading = 'Commands'
  static readonly logHeading = 'Commands'

  static readonly regex = '^[a-zA-Z0-9]+';

  // 'ID', 'DATE', 'LOGGINGTYPE', 'ACTION', 'DATA'

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.extraLogTypes.COMMAND + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.run + '\')' +
    ' And ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + Cmd.regex +
    '\'';

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), DATA FROM LOGGING WHERE LOGGINGTYPE IN('COMMAND') AND ACTION IN('run') AND DATA REGEXP '^[a-zA-Z0-9]+' GROUP BY DATA;
  static readonly query = 'SELECT * FROM ' + Cmd.queryDetails;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' + Cmd.queryDetails;

  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    Cmd.chartCountKey + ', ' +
    Cmd.chartDataKey +
    ' FROM ' + Cmd.queryDetails +
    ' GROUP BY ' + Cmd.chartDataKey;

  static readonly searchQuery = Cmd.query +
    ' And ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = Cmd.countQuery +
  ' And ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly cmdChart: ChartType = {
    name: Cmd.chartHeading,
    regex: Cmd.regex,
    query: Cmd.chartQuery,
    countQuery: Cmd.countQuery,
    searchQuery: Cmd.searchQuery,
    searchCountQuery: Cmd.searchCountQuery,
    countColumn: Cmd.chartCountKey,
    dataColumn: Cmd.chartDataKey,
    type: 'bar',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: colours,
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly cmdLog: LogType = {
    name: Cmd.logHeading,
    query: Cmd.query + ' ORDER BY DATE DESC',
    countQuery: Cmd.countQuery,
    searchQuery: Cmd.searchQuery,
    searchCountQuery: Cmd.searchCountQuery,
  }

  static readonly trigger = 'API'
  static readonly params = 'Params'
  static readonly cmdButton = 'Run'
  static readonly clearButton = 'Clear'

  static readonly confirmRun = 'Are you sure you want to run the API command?'
  static readonly noRun = 'No'
  static readonly yesRun = 'Yes'
  static readonly runSuccess = 'You have run your API successfully'
  static readonly cancelRun = 'Cancel API Command'
}

/** @class Addresses */
class Addresses {
  static readonly heading = 'Addresses to URLs'
  static readonly chartHeading = 'Address Transactions'
  static readonly logHeading = 'Address Transactions'

  static readonly regex = '^Mx[A-Z0-9]+'

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.tables.txpow.name + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.insert + '\')' +
    ' And ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + Addresses.regex +
    '\'';

  static readonly query = 'SELECT * FROM ' + Addresses.queryDetails;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' + Addresses.queryDetails;

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), DATA FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^Mx[A-Z0-9]+' GROUP BY DATA;
  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    Addresses.chartCountKey + ', ' +
    Addresses.chartDataKey +
    ' FROM ' + Addresses.queryDetails +
    ' GROUP BY ' + Addresses.chartDataKey;

  static readonly searchQuery = Addresses.query +
    ' And ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = Addresses.countQuery +
  ' And ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly addressChart: ChartType = {
    name: Addresses.chartHeading,
    regex: Addresses.regex,
    query: Addresses.chartQuery,
    countQuery: Addresses.countQuery,
    searchQuery: Addresses.searchQuery,
    searchCountQuery: Addresses.searchCountQuery,
    countColumn: Addresses.chartCountKey,
    dataColumn: Addresses.chartDataKey,
    type: 'bar',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly addressLog: LogType = {
    name: Addresses.logHeading,
    query: Addresses.query + ' ORDER BY DATE DESC',
    countQuery: Addresses.countQuery,
    searchQuery: Addresses.searchQuery,
    searchCountQuery: Addresses.searchCountQuery,
  }

  static readonly address = 'Mx Address'
  static readonly url = 'URL'

  static readonly mxLengthError =
    'Minima addresses should be 34 characters, of the form Mx...'
  static readonly mxFormatError = 'Not a Minima address'

  static readonly callButton = 'Create'
  static readonly deleteButton = 'Delete'
  static readonly smallDeleteButton = 'Del'

  static readonly addressError = 'Please input a valid Minima address'
  static readonly urlError = 'Please input a valid URL'
}

/** @class Tokens */
class Tokens {
  static readonly heading = 'Tokens to URLs'

  static readonly chartHeading = 'Token Transactions'
  static readonly tokenDailyChartHeading = 'Daily Token Transactions'
  static readonly logHeading = 'Token Transactions'
  static readonly regex = '^0x[A-Z0-9]+'

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.tables.txpow.name + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.insert + '\')' +
    ' And ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + Tokens.regex +
    '\'';

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), SUBSTRING(DATA,1,5) FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^0x00' GROUP BY SUBSTRING(DATA,1,5);
  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), SUBSTRING(DATA,1,130) FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^0x[A-Z0-9][A-Z0-9][A-Z0-9]+' GROUP BY SUBSTRING(DATA,1,130);
  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    Tokens.chartCountKey + ', ' +
    Tokens.chartDataKey +
    ' FROM ' + Tokens.queryDetails +
    ' GROUP BY ' + Tokens.chartDataKey;

  static readonly query = 'SELECT * FROM ' + Tokens.queryDetails;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' + Tokens.queryDetails;

  static readonly searchQuery = Tokens.query +
    ' And ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = Tokens.countQuery +
  ' And ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly tokenChart: ChartType = {
    name: Tokens.chartHeading,
    regex: Tokens.regex,
    query: Tokens.chartQuery,
    countQuery: Tokens.countQuery,
    searchQuery: Tokens.searchQuery,
    searchCountQuery: Tokens.searchCountQuery,
    countColumn: Tokens.chartCountKey,
    dataColumn: Tokens.chartDataKey,
    type: 'bar',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  // 'ID', 'DATE', 'LOGGINGTYPE', 'ACTION', 'DATA'
  // eslint-disable-next-line max-len
  // SELECT COUNT(FROM_UNIXTIME(DATE/1000)) FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^0x00' GROUP BY DAY(FROM_UNIXTIME(DATE/1000));
  // eslint-disable-next-line max-len
  // SELECT COUNT(FROM_UNIXTIME(DATE/1000)), SUBSTRING(DATA,1,5) FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^0x00' GROUP BY DAY(FROM_UNIXTIME(DATE/1000)), SUBSTRING(DATA,1,5);
  // eslint-disable-next-line max-len
  // SELECT COUNT(FROM_UNIXTIME(DATE/1000)), DATE(FROM_UNIXTIME(DATE/1000)) FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^0x00' GROUP BY DAY(FROM_UNIXTIME(DATE/1000)), DATE(FROM_UNIXTIME(DATE/1000));
  static readonly dailyCountKey =
    'COUNT(FROM_UNIXTIME(' + Dbase.tables.log.columns[1] + '/1000))';
  static readonly dailyDataKey =
    'DATE(FROM_UNIXTIME(' + Dbase.tables.log.columns[1] + '/1000))';
  static readonly tokenDailyQuery = 'SELECT ' +
    Tokens.dailyCountKey + ', ' +
    Tokens.dailyDataKey +
    ' FROM ' + Tokens.queryDetails +
    ' GROUP BY DAY(FROM_UNIXTIME(' + Dbase.tables.log.columns[1] + '/1000)), ' +
    Tokens.dailyDataKey;

  static readonly tokenDailyChart: ChartType = {
    name: Tokens.tokenDailyChartHeading,
    regex: Tokens.regex,
    query: Tokens.tokenDailyQuery,
    countQuery: Tokens.countQuery,
    searchQuery: Tokens.searchQuery,
    searchCountQuery: Tokens.searchCountQuery,
    countColumn: Tokens.dailyCountKey,
    dataColumn: Tokens.dailyDataKey,
    type: 'bar',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly tokenLog: LogType = {
    name: Tokens.logHeading,
    query: Tokens.query + ' ORDER BY DATE DESC',
    countQuery: Tokens.countQuery,
    searchQuery: Tokens.searchQuery,
    searchCountQuery: Tokens.searchCountQuery,
  }

  static readonly tokenId = 'Token iD'
  static readonly url = 'URL'

  static readonly tokenLengthError =
    'Tokens should be 4 or 130 characters, of the form 0x...'
  static readonly tokenFormatError = 'Not a Minima token'

  static readonly tokenButton = 'Create'
  static readonly deleteButton = 'Delete'
  static readonly smallDeleteButton = 'Del'

  static readonly idError = 'Please input a valid Token iD'
  static readonly urlError = 'Please input a valid URL'
}

/** @class Triggers */
class Triggers {
  static readonly heading = 'API'

  static readonly endpoint = 'API'
  static readonly command = 'Command'
  static readonly format = 'Format'
  static readonly setParams = 'Set Params'
  static readonly params = 'Params'
  static readonly public = 'Public'
  static readonly url = 'URL'

  static readonly triggerButton = 'Create'
  static readonly deleteButton = 'Delete'

  static readonly showTrigger = 'Show Trigger'
  static readonly closeTrigger = 'Ok'
}

/** @class Balances */
class Balances {
  static readonly heading = 'Tokens and Balances'

  static readonly token = 'Token'
  static readonly sendable = 'Sendable'
  static readonly amount = 'Confirmed'
  static readonly unconfirmed = 'Transient'
  static readonly mempool = 'Mempool'
}

/** @class API */
class API {
  static readonly heading = 'API'

  static readonly chartHeading = 'API Calls'
  static readonly logHeading = 'API Calls'
  static readonly regex = '^[a-zA-Z0-9]+'

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.tables.trigger.name + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.run + '\')' +
    ' And ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + API.regex +
    '\'';

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), DATA FROM LOGGING WHERE LOGGINGTYPE IN('API') AND ACTION IN('run') AND DATA REGEXP '^[a-zA-Z0-9]* ' GROUP BY DATA;
  static readonly query = 'SELECT * FROM ' + API.queryDetails;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' + API.queryDetails;

  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    API.chartCountKey + ', ' +
    API.chartDataKey +
    ' FROM ' + API.queryDetails +
    ' GROUP BY ' + API.chartDataKey;

  static readonly searchQuery = API.query +
    ' And ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = API.countQuery +
  ' And ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly apiChart: ChartType = {
    name: API.chartHeading,
    regex: API.regex,
    query: API.chartQuery,
    countQuery: API.countQuery,
    searchQuery: API.searchQuery,
    searchCountQuery: API.searchCountQuery,
    countColumn: API.chartCountKey,
    dataColumn: API.chartDataKey,
    type: 'bar',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly apiLog: LogType = {
    name: API.logHeading,
    query: API.query + ' ORDER BY DATE DESC',
    countQuery: API.countQuery,
    searchQuery: API.searchQuery,
    searchCountQuery: API.searchCountQuery,
  }
}

/** @class Status */
class Status {
  static readonly heading = 'Status'

  static readonly ram = 'RAM'
  static readonly upTime = 'Uptime'
  static readonly block = 'Block'
}

/** @class Log */
class Log {
  static readonly heading = 'Logs'
  static readonly total = 'Total Entries'

  static readonly dateCreated = 'Created'
  static readonly filter = 'Filter for User'
  static readonly user = 'User'
  static readonly loggingType = 'Type'
  static readonly data = 'Data'
  static readonly extra = 'Extra'
  static readonly action = 'Action'
  static readonly records = 'Page'

  static readonly nextButton = 'Next'
  static readonly backButton = 'Back'

  static readonly query = 'SELECT * FROM ' +
    Dbase.tables.log.name +
    ' ORDER BY DATE DESC';

  static readonly countQuery = 'SELECT COUNT(*) FROM ' +
    Dbase.tables.log.name;

  static readonly searchQueryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' LIKE \'%<searchTerm>%\'' +
    ' OR ' + Dbase.tables.log.columns[3] +
    ' LIKE \'%<searchTerm>%\'' +
    ' OR ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchQuery =
    'SELECT * FROM ' + Log.searchQueryDetails + ' ORDER BY DATE DESC';

  static readonly searchCountQuery =
    'SELECT COUNT(*) FROM ' + Log.searchQueryDetails;

    static readonly log: LogType = {
      name: Log.heading,
      query: Log.query,
      countQuery: Log.countQuery,
      searchQuery: Log.searchQuery,
      searchCountQuery: Log.searchCountQuery,
    }
}

/** @class SQL */
class SQL {
  static readonly insertSuccess = 'Insert Success'
  static readonly insertFailure = 'Insert Failure'

  static readonly deleteSuccess = 'Delete Success'
  static readonly deleteFailure = 'Delete Failure'

  static readonly selectSuccess = 'Select Success'
  static readonly selectFailure = 'Select Failure'
}

/** @class Post */
class Post {
  postSuccess = 'Post Success'
  static readonly postFailure = 'Post Failure'

  static readonly getSuccess = 'Get Success'
  static readonly getFailure = 'Get Failure'
}

/** @class Chart */
class Chart {
  static readonly barThickness = Misc.barThickness;
  static readonly axisOffset = 50;
  static readonly labelOffset = Misc.barThickness;
  static readonly labelFontsize = 16;

  static readonly gridHeight =
    Chart.barThickness +
    Chart.labelOffset +
    Chart.labelFontsize;
  static readonly totals = 'Total';
  static readonly chartInfo = [
    Tokens.chartHeading,
    Addresses.chartHeading,
    API.chartHeading,
    Cmd.chartHeading,
    Tokens.tokenDailyChartHeading];
}

/** @class Search */
class Search {
  static readonly placeHolder = 'Search';
}


/** @class URL */
class URL {
  static readonly heading = 'Minima to URL';

  static readonly addressButton = 'Addresses to URLs';
  static readonly tokenButton = 'Tokens to URLs';

  static readonly liveColour = '#317AFF';
  static readonly notLiveColour = '#FAFAFF';

  static readonly liveTextColour = 'white'
  static readonly notLiveTextColour = '#317AFF'
}

export {
  App,
  Misc,
  Smtp,
  Dbase,
  Paths,
  GeneralError,
  Home,
  Welcome,
  About,
  Help,
  Contact,
  Cmd,
  Log,
  Addresses,
  Tokens,
  Triggers,
  Balances,
  API,
  Status,
  SQL,
  Post,
  Chart,
  Search,
  URL,
};

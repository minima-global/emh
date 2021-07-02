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
  static readonly axisOffset = 50;
  static readonly labelFontsize = 16;

  static readonly gridHeight =
    Misc.barThickness +
    Misc.labelOffset +
    Misc.labelFontsize;

  static readonly time = {
    anHour: {
      timeString: 'AN HOUR',
      timeAmount: 3600000,
    },
    sixHours: {
      timeString: 'SIX HOURS',
      timeAmount: 21600000,
    },
    twelveHours: {
      timeString: 'TWELVE HOURS',
      timeAmount: 43200000,
    },
    aDay: {
      timeString: 'ONE DAY',
      timeAmount: 86400000,
    },
    aWeek: {
      timeString: 'ONE WEEK',
      timeAmount: 604800000,
    },
    aMonth: {
      timeString: 'ONE MONTH',
      timeAmount: 2629800000,
    },
    threeMonths: {
      timeString: 'THREE MONTHS',
      timeAmount: 7889400000,
    },
    sixMonths: {
      timeString: 'SIX MONTHS',
      timeAmount: 15778800000,
    },
    aYear: {
      timeString: 'ONE YEAR',
      timeAmount: 31557600000, // 365.25 * aWeek,
    },
  };
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
      columns: ['ID', 'DATE', 'LOGGINGTYPE', 'ACTION', 'DATA', 'EXTRA'],
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
  Search,
  URL,
};

/** @class App */
class App {
  static readonly title = 'Minima'
  static readonly subTitle = 'The evolution will not be centralised'
  static readonly appName = 'Enterprise Minima'
  static readonly catchLine = `${App.title} Powered`
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
      name: 'CONSOLE',
      key: {
        name: ['ID'],
        isAuto: true,
      },
      columns: ['ID', 'LOGGINGTYPEID', 'LOGGINGTYPE', 'DATE', 'DATA'],
    },
    trigger: {
      name: 'COMMAND',
      key: {
        name: ['ENDPOINT'],
        isAuto: false,
      },
      columns: ['ENDPOINT', 'CMD', 'SETPARAMS', 'PARAMS'],
    },
  };

  static readonly extraLogTypes = {
    COMMAND: 'COMMAND',
    API: 'API',
    URL: 'URL',
  };

  static readonly maxLimit = 2147483647
  static readonly pageLimit = 25
}


/** @class Paths */
class Paths {
  static readonly home = 'Home'
  static readonly about = 'About'
  static readonly help = 'Help'
  static readonly contact = 'Contact'
  static readonly welcome = 'Welcome'

  static readonly logs = 'Logs'
  static readonly addresses = 'Addresses'
  static readonly tokens = 'Tokens'
  static readonly triggers = 'Triggers'
  static readonly urls = 'URLs'
  static readonly cmd = 'Console'
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
  static readonly heading = 'Run Trigger'

  static readonly trigger = 'Trigger'
  static readonly params = 'Params'
  static readonly cmdButton = 'Run'
}

/** @class Addresses */
class Addresses {
  static readonly heading = 'Addresses to URLs'

  static readonly address = 'Mx Address'
  static readonly url = 'URL'

  static readonly mxLengthError =
    'Minima addresses should be 34 characters, of the form Mx...'
  static readonly mxFormatError = 'Not a Minima address'

  static readonly callButton = 'Submit'
  static readonly deleteButton = 'Delete'

  static readonly addressError = 'Please input a valid Minima address'
  static readonly urlError = 'Please input a valid URL'
}

/** @class Tokens */
class Tokens {
  static readonly heading = 'Tokens to URLs'

  static readonly tokenId = 'Token ID'
  static readonly url = 'URL'

  static readonly tokenLengthError =
    'Tokens should be 4 or 130 characters, of the form 0x...'
  static readonly tokenFormatError = 'Not a Minima token'

  static readonly tokenButton = 'Submit'
  static readonly deleteButton = 'Delete'

  static readonly idError = 'Please input a valid Token ID'
  static readonly urlError = 'Please input a valid URL'
}

/** @class Triggers */
class Triggers {
  static readonly heading = 'Triggers'

  static readonly endpoint = 'API'
  static readonly command = 'Cmd'
  static readonly setParams = 'Set'
  static readonly params = 'Params'

  static readonly triggerButton = 'Submit'
  static readonly deleteButton = 'Delete'
}

/** @class Log */
class Log {
  static readonly heading = 'Logs'

  static readonly dateCreated = 'Date Created'
  static readonly filter = 'Filter for User'
  static readonly user = 'User'
  static readonly loggingType = 'Logging Type'
  static readonly data = 'Data'
  static readonly loggingTypeId = 'Logging Type ID'
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
  static readonly postSuccess = 'Post Success'
  static readonly postFailure = 'Post Failure'

  static readonly getSuccess = 'Get Success'
  static readonly getFailure = 'Get Failure'
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
  SQL,
  Post,
};

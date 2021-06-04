/** @class App */
class App {
  static readonly title = 'Minima'
  static readonly subTitle = 'The evolution will not be centralised'
  static readonly appName = 'Tokeniser'
  static readonly catchLine = `${App.title} Powered`
  static readonly tagline = ''
  static readonly website = 'http://www.minima.global'
  static readonly copyright = '© Copyright 2021 Minima GmbH'
  static readonly author = 'Dr Steve Huckle'
  static readonly enquiries = 'Minima Community Team'
  static readonly email = 'community@minima.global'
  static readonly bugEmail = 'minima-global@fire.fundersclub.com'
  static readonly version = '0.1.1'
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
}

/** @class Smtp */
class Smtp {
  static readonly token = 'bcffc60c-e73d-4e79-9611-a5349751fd8c'
}

/** @class Paths */
class Paths {
  static readonly home = 'Home'
  static readonly about = 'About'
  static readonly help = 'Help'
  static readonly contact = 'Contact'
  static readonly welcome = 'Welcome'
  static readonly tokens = 'Tokens'
}

/** @class GeneralError */
class GeneralError {
  static readonly required = 'Required'
  static lengthError255 = 'Cannot be longer than 255 characters'
  static lengthError1024 = 'Cannot be longer than 1024 characters'
}

/** @class Home */
class Home {
  static readonly heading = 'Home'
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

/** @class Tokens */
class Tokens {
  static readonly heading = 'Create Token'

  static readonly tokenName = 'Name'
  static readonly amount = 'Amount'
  static readonly description = 'Description'
  static readonly icon = 'Icon URL'
  static readonly proof = 'Proof URL'

  static readonly tokenLengthError =
    'Tokens should be 4 or 130 characters, of the form 0x...'
  static readonly tokenFormatError = 'Not a Minima token'
  static readonly urlError = 'Please input a valid URL'

  static readonly tokenButton = 'Submit'
}

/** @class Balances */
class Balances {
  static readonly heading = 'Balances'

  static readonly token = 'Token'
  static readonly sendable = 'Sendable'
  static readonly amount = 'Confirmed'
  static readonly unconfirmed = 'Transient'
  static readonly mempool = 'Mempool'
}

/** @class Transaction */
class Transaction {
  static readonly pending = 'Please wait - transaction is pending'
  static readonly success = 'Transaction Succeeded'
  static readonly failure = 'Transaction Failed'

  static readonly block = 'Block'

  static readonly errorGettingData = 'Error getting data'
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
  Paths,
  GeneralError,
  Home,
  About,
  Help,
  Contact,
  Tokens,
  Balances,
  Transaction,
  Post,
};

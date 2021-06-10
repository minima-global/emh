/** @class App */
class App {
  static readonly title = 'Minima'
  static readonly subTitle = 'The evolution will not be centralised'
  static readonly appName = 'Minima Statistician'
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
}
/** @class Paths */
class Paths {
  static readonly home = 'Home'
  static readonly about = 'About'
  static readonly help = 'Help'
  static readonly contact = 'Contact'
  static readonly welcome = 'Welcome'
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

/** @class API */
class API {
  static readonly heading = 'API'
  static readonly chartHeading = 'API Calls'
}

/** @class Status */
class Status {
  static readonly heading = 'Status'

  static readonly ram = 'RAM'
  static readonly upTime = 'Uptime'
  static readonly block = 'Block'
}

/** @class Chart */
class Chart {
  static readonly barThickness = 30;
  static readonly labelOffset = 20;
  static readonly labelFontsize = 16;
  static readonly gridHeight =
    Chart.barThickness + Chart.labelOffset + Chart.labelFontsize + 15;
}


/** @class Tokens */
class Tokens {
  static readonly heading = 'Tokens'
  static readonly chartHeading = 'Token Transactions'

  static readonly tokenId = 'Token ID'
}

export {
  App,
  Misc,
  Paths,
  GeneralError,
  Home,
  About,
  Help,
  Contact,
  API,
  Status,
  Chart,
  Tokens,
};

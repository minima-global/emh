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
  static readonly version = '0.2.0'
  static readonly release = 'Testnet'
}

/** @class Paths */
class Paths {
  static readonly home = 'Home'
  static readonly about = 'About'
  static readonly help = 'Help'
  static readonly contact = 'Contact'
  static readonly welcome = 'Welcome'

  static readonly logs = 'Logs'
  static readonly cmd = 'console'
}

/** @class GeneralError */
class GeneralError {
  static readonly required = 'Required'
}

/** @class Home */
class Home {
  static readonly heading = `${App.appName}`
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
  static readonly loginTip = 'Sign In'
  static readonly logoutTip = 'Sign Out'
  static readonly registerTip = 'Register'
  static readonly userTip = 'Profile'
  static readonly rewardTip = 'Rewards'
  static readonly referralTip = 'Referrals'
  static readonly downloadTip = 'Download'
  static readonly referralCopyTip = 'Copy'
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
  static readonly heading = 'Console'

  static readonly cmd = 'Command'
  static readonly cmdButton = 'Run Command'
}

/** @class Cmd */
class Log {
  static readonly heading = 'Logs'

  static readonly dateCreated = 'Date Created'
  static readonly filter = 'Filter for User'
  static readonly user = 'User'
  static readonly loggingType = 'Logging Type'
  static readonly data = 'Data'
  static readonly loggingTypeId = 'Logging Type ID'
}

/** @class Post */
class Post {
  static readonly postSuccess = 'Post Success'
  static readonly postFailure = 'Post Failure'

  static readonly getSuccess = 'Get Success'
  static readonly getFailure = 'Get Failure'
}

export {App,
  Paths,
  GeneralError,
  Home,
  Welcome,
  About,
  Help,
  Contact,
  Cmd,
  Log,
  Post,
};

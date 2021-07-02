/** @class Local */
class Local {
  static readonly base = 'http://127.0.0.1:9004/'
  static readonly home = '/'
  static readonly about = '/about'
  static readonly help = '/help'
  static readonly contact = '/contact'
  static readonly logs = '/logs'
  static readonly urls = '/urls'
  static readonly addresses = '/addresses'
  static readonly tokens = '/tokens'
  static readonly chartTokens = '/chartTokens'
  static readonly chartMinima = '/chartMinima'
  static readonly chartDailyMinima = '/chartDailyMinima'
  static readonly chartDailyTokens = '/chartDailyTokens'
  static readonly chartAddresses = '/chartAddresses'
  static readonly chartDailyAddresses = '/chartDailyAddresses'
  static readonly chartAPI = '/chartAPI'
  static readonly chartCmds = '/chartCommands'

  static readonly logTokens = '/logTokens'
  static readonly logMinima = '/logMinima'
  static readonly logDailyTokens = '/logDailyTokens'
  static readonly logDailyMinima = '/logDailyMinima'
  static readonly logAddresses = '/logAddresses'
  static readonly logDailyAddresses = '/logDailyAddresses'
  static readonly logAPI = '/logAPI'
  static readonly logCmds = '/logCommands'

  static readonly triggers = '/triggers'
  static readonly cmd = '/cmd'
  static readonly apiBase = 'api/EMH/?command='
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
  static readonly tokenDaily = 'Tokens'
  static readonly minima = 'Minima'
  static readonly minimaDaily = 'Minima Daily'
  static readonly triggers = 'URL to Minima'
  static readonly cmd = 'Run API'
}

export {Local, Paths};

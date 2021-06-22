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
  static readonly chartAddresses = '/chartAddresses'
  static readonly chartAPI = '/chartAPI'
  static readonly chartCmds = '/chartCommands'

  static readonly logTokens = '/logTokens'
  static readonly logAddresses = '/logAddresses'
  static readonly logAPI = '/logAPI'
  static readonly logCmds = '/logCommands'

  static readonly triggers = '/triggers'
  static readonly cmd = '/cmd'
  static readonly apiBase = 'api/EMH/?command='
}

export {Local};

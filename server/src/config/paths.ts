/** @class Local */
class Local {
  static readonly home = '/'
  static readonly about = '/about'
  static readonly help = '/help'
  static readonly contact = '/contact'
  static readonly logs = '/logs'
  static readonly calls = '/calls'
  static readonly cmd = '/cmd'
}

/** @class Remote */
class Remote {
  static readonly cmdURL = 'http://localhost:9002/cmd';
}

export {Local, Remote};

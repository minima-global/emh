/** @class Local */
class Local {
  static readonly home = '/'
  static readonly about = '/about'
  static readonly help = '/help'
  static readonly contact = '/contact'

  static readonly wallet = '/wallet'
  static readonly balance = '/balance'
  static readonly token = '/token'
}

class Remote {
  
  static readonly server = 'http://127.0.0.1:9004'
  static readonly websocketServer = 'ws://127.0.0.1:9003'
  static readonly serverApiBase = 'api/EMH/?command'

  static readonly createTokenCommand = 'tokenCreate'
  static readonly nameParam = 'name'
  static readonly amountParam = 'amount'
  static readonly descriptionParam = 'description'
  static readonly scriptParam = 'script'
  static readonly iconParam = 'icon'
  static readonly proofParam = 'proof'


  static readonly addTokenListenerCommand = 'addTokenListener'

  static readonly balanceCommand = 'balance'

  static readonly sendCommand = 'send'
  static readonly tokenParam = 'tokenId'
  static readonly addressParam = 'address'

  static readonly scriptsCommand = 'scripts'
}

export {Local, Remote};

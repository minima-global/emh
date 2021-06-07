/** @class Local */
class Local {
  static readonly home = '/'
  static readonly about = '/about'
  static readonly help = '/help'
  static readonly contact = '/contact'

  static readonly send = '/send'
  static readonly balance = '/balance'
  static readonly token = '/token'
}

class Remote {
  
  static readonly server = 'http://127.0.0.1:9004'
  static readonly websocketServer = 'ws://127.0.0.1:9003'
  static readonly serverApiBase = 'api/EMH/?command'
  
  static readonly addListenerCommand = 'addAppListener';
  static readonly removeListenerCommand = 'removeAppListener';
  static readonly idParam = 'id';

  static readonly createTokenCommand = 'tokenCreate'
  static readonly addTokenListenerCommand = 'addTokenListener'
  static readonly nameParam = 'name'
  static readonly amountParam = 'amount'
  static readonly descriptionParam = 'description'
  static readonly scriptParam = 'script'
  static readonly iconParam = 'icon'
  static readonly proofParam = 'proof'

  static readonly balanceCommand = 'balance'

  static readonly sendCommand = 'send'
  static readonly tokenParam = 'tokenid'
  static readonly addressParam = 'address'
}

export {Local, Remote};

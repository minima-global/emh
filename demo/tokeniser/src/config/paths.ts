/** @class Local */
class Local {
  static readonly home = '/'
  static readonly about = '/about'
  static readonly help = '/help'
  static readonly contact = '/contact'
}

class Remote {

  static readonly server = 'http://127.0.0.1:9004'
  static readonly serverApiBase = 'api/EMH/?command'
  static readonly tokenCommand = 'tokenCreate'
  static readonly nameParam = 'name'
  static readonly amountParam = 'amount'
  static readonly descriptionParam = 'description'
  static readonly scriptParam = 'script'
  static readonly iconParam = 'icon'
  static readonly proofParam = 'proof'
}

export {Local, Remote};

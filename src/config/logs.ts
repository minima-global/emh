import shortid from 'shortid';
import {Dbase} from './vars';

import {
  LogType,
} from '../store/types';

import {
  Cmd as CmdChart,
  Addresses as AddressesChart,
  Tokens as TokensChart,
  DailyTokens as DailyTokensChart,
  API as APIChart,
} from './charts';


/** @class Cmd */
class Cmd {
  static readonly logHeading = 'Commands'

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    CmdChart.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' +
    CmdChart.queryDetails;

  static readonly logSearchQuery = CmdChart.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = CmdChart.logCountQuery +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';


  static readonly log: LogType = {
    name: Cmd.logHeading,
    key: Cmd.logKey,
    query: Cmd.logQuery,
    countQuery: Cmd.logCountQuery,
    searchQuery: Cmd.logSearchQuery,
    searchCountQuery: Cmd.logSearchCountQuery,
  }
}

/** @class Addresses */
class Addresses {
  static readonly logHeading = 'Address Transactions'

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    AddressesChart.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' +
    AddressesChart.queryDetails;

  static readonly logSearchQuery = AddressesChart.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = AddressesChart.logCountQuery +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly log: LogType = {
    name: Addresses.logHeading,
    key: Addresses.logKey,
    query: Addresses.logQuery,
    countQuery: Addresses.logCountQuery,
    searchQuery: Addresses.logSearchQuery,
    searchCountQuery: Addresses.logSearchCountQuery,
  }
}

/** @class Tokens */
class Tokens {
  static readonly logHeading = 'Token Transactions'

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    TokensChart.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' +
    TokensChart.queryDetails;

  static readonly logSearchQuery = TokensChart.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = TokensChart.logCountQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly log: LogType = {
    name: Tokens.logHeading,
    key: Tokens.logKey,
    query: Tokens.logQuery,
    countQuery: Tokens.logCountQuery,
    searchQuery: Tokens.logSearchQuery,
    searchCountQuery: Tokens.logSearchCountQuery,
  }
}

/** @class DailyTokens */
class DailyTokens {
  static readonly logHeading = 'Daily Token Transactions'

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    DailyTokensChart.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery =
    'SELECT COUNT(*) FROM ' + DailyTokensChart.queryDetails;

  static readonly logSearchQuery = DailyTokensChart.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = DailyTokensChart.logCountQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly log: LogType = {
    name: DailyTokens.logHeading,
    key: DailyTokens.logKey,
    query: DailyTokens.logQuery,
    countQuery: DailyTokens.logCountQuery,
    searchQuery: DailyTokens.logSearchQuery,
    searchCountQuery: DailyTokens.logSearchCountQuery,
  }
}

/** @class API */
class API {
  static readonly logHeading = 'API Calls'

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    APIChart.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' +
    APIChart.queryDetails;

  static readonly logSearchQuery = APIChart.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = APIChart.logCountQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly log: LogType = {
    name: API.logHeading,
    key: API.logKey,
    query: API.logQuery,
    countQuery: API.logCountQuery,
    searchQuery: API.logSearchQuery,
    searchCountQuery: API.logSearchCountQuery,
  }
}

/** @class Log */
class Log {
  static readonly logHeading = 'Logs'

  static readonly logKey = shortid.generate();

  static readonly query = 'SELECT * FROM ' +
    Dbase.tables.log.name +
    ' ORDER BY DATE DESC';

  static readonly countQuery = 'SELECT COUNT(*) FROM ' +
    Dbase.tables.log.name;

  static readonly searchQueryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' LIKE \'%<searchTerm>%\'' +
    ' OR ' + Dbase.tables.log.columns[3] +
    ' LIKE \'%<searchTerm>%\'' +
    ' OR ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchQuery =
    'SELECT * FROM ' + Log.searchQueryDetails + ' ORDER BY DATE DESC';

  static readonly searchCountQuery =
    'SELECT COUNT(*) FROM ' + Log.searchQueryDetails;

  static readonly log: LogType = {
    name: Log.logHeading,
    key: Log.logKey,
    query: Log.query,
    countQuery: Log.countQuery,
    searchQuery: Log.searchQuery,
    searchCountQuery: Log.searchCountQuery,
  }
}

export {
  Cmd,
  Addresses,
  Tokens,
  DailyTokens,
  API,
  Log,
};

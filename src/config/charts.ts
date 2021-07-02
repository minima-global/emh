import shortid from 'shortid';
import {Misc, Dbase} from './vars';

import {
  ChartType,
  LogType,
} from '../store/types';

import {colours} from './colours';

/** @class Cmd */
class Cmd {
  static readonly chartHeading = 'Commands'
  static readonly logHeading = 'Commands'

  static readonly regex = '^[a-zA-Z0-9]+';

  static readonly chartKey = shortid.generate();

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.extraLogTypes.COMMAND + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.run + '\')' +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + Cmd.regex + '\'';

  static readonly queryWithDate = Cmd.queryDetails +
    ' AND (DATE BETWEEN <firstTime> AND <secondTime>)';

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), DATA FROM LOGGING WHERE LOGGINGTYPE IN('COMMAND') AND ACTION IN('run') AND DATA REGEXP '^[a-zA-Z0-9]+' GROUP BY DATA;
  static readonly query = 'SELECT * FROM ' + Cmd.queryWithDate;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' + Cmd.queryWithDate;
  static readonly searchQuery = Cmd.query +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = Cmd.countQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    Cmd.chartCountKey + ', ' +
    Cmd.chartDataKey +
    ' FROM ' + Cmd.queryWithDate +
    ' GROUP BY ' + Cmd.chartDataKey;

  static readonly chartSearchQuery = 'SELECT ' +
  Cmd.chartCountKey + ', ' +
  Cmd.chartDataKey +
  ' FROM ' + Cmd.queryWithDate +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'' +
  ' GROUP BY ' + Cmd.chartDataKey;

  static readonly chart: ChartType = {
    name: Cmd.chartHeading,
    key: Cmd.chartKey,
    query: Cmd.chartQuery,
    countQuery: Cmd.countQuery,
    searchQuery: Cmd.chartSearchQuery,
    searchCountQuery: Cmd.searchCountQuery,
    countColumn: Cmd.chartCountKey,
    dataColumn: Cmd.chartDataKey,
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      plugins: {
        legend: {
          display: false,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
              speed: 1,
            },
            pinch: {
              enabled: true,
            },
            mode: 'y',
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: colours,
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    Cmd.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' +
    Cmd.queryDetails;

  static readonly logSearchQuery = Cmd.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = Cmd.logCountQuery +
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
  static readonly chartHeading = 'Address Transactions'
  static readonly logHeading = 'Address Transactions'

  // Stuff to make the charts and logs work
  static readonly regex = '^Mx[A-Z0-9]+'

  static readonly chartKey = shortid.generate();

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.tables.txpow.name + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.insert + '\')' +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + Addresses.regex + '\'';

  static readonly queryWithDate = Addresses.queryDetails +
    ' AND (DATE BETWEEN <firstTime> AND <secondTime>)';

  static readonly query = 'SELECT * FROM ' + Addresses.queryWithDate;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' +
    Addresses.queryWithDate;

  static readonly searchQuery = Addresses.query +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = Addresses.countQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), DATA FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^Mx[A-Z0-9]+' GROUP BY DATA;
  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    Addresses.chartCountKey + ', ' +
    Addresses.chartDataKey +
    ' FROM ' + Addresses.queryWithDate +
    ' GROUP BY ' + Addresses.chartDataKey;

  static readonly chartSearchQuery = 'SELECT ' +
    Addresses.chartCountKey + ', ' +
    Addresses.chartDataKey +
    ' FROM ' + Addresses.queryWithDate +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'' +
    ' GROUP BY ' + Addresses.chartDataKey;

  static readonly chart: ChartType = {
    name: Addresses.chartHeading,
    key: Addresses.chartKey,
    query: Addresses.chartQuery,
    countQuery: Addresses.countQuery,
    searchQuery: Addresses.chartSearchQuery,
    searchCountQuery: Addresses.searchCountQuery,
    countColumn: Addresses.chartCountKey,
    dataColumn: Addresses.chartDataKey,
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      plugins: {
        legend: {
          display: false,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
              speed: 1,
            },
            pinch: {
              enabled: true,
            },
            mode: 'y',
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    Addresses.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' +
    Addresses.queryDetails;

  static readonly logSearchQuery = Addresses.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = Addresses.logCountQuery +
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
  static readonly chartHeading = 'Token Transactions'
  static readonly logHeading = 'Token Transactions'

  // stuff to make the charts and logs work
  static readonly regex = '^0x[A-Z0-9][A-Z0-9]+'

  static readonly chartKey = shortid.generate();

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.tables.txpow.name + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.insert + '\')' +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + Tokens.regex + '\'';

  static readonly queryWithDate = Tokens.queryDetails +
    ' AND (DATE BETWEEN <firstTime> AND <secondTime>)';

  static readonly query = 'SELECT * FROM ' + Tokens.queryWithDate;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' + Tokens.queryWithDate;
  static readonly searchQuery = Tokens.query +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = Tokens.countQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), SUBSTRING(DATA,1,5) FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^0x00' GROUP BY SUBSTRING(DATA,1,5);
  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), SUBSTRING(DATA,1,130) FROM LOGGING WHERE LOGGINGTYPE IN('TXPOW') AND ACTION IN('insert') AND DATA REGEXP '^0x[A-Z0-9][A-Z0-9][A-Z0-9]+' GROUP BY SUBSTRING(DATA,1,130);
  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    Tokens.chartCountKey + ', ' +
    Tokens.chartDataKey +
    ' FROM ' + Tokens.queryWithDate +
    ' GROUP BY ' + Tokens.chartDataKey;

  static readonly chartSearchQuery = 'SELECT ' +
    Tokens.chartCountKey + ', ' +
    Tokens.chartDataKey +
    ' FROM ' + Tokens.queryWithDate +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'' +
    ' GROUP BY ' + Tokens.chartDataKey;

  static readonly chart: ChartType = {
    name: Tokens.chartHeading,
    key: Tokens.chartKey,
    query: Tokens.chartQuery,
    countQuery: Tokens.countQuery,
    searchQuery: Tokens.chartSearchQuery,
    searchCountQuery: Tokens.searchCountQuery,
    countColumn: Tokens.chartCountKey,
    dataColumn: Tokens.chartDataKey,
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      plugins: {
        legend: {
          display: false,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
              speed: 1,
            },
            pinch: {
              enabled: true,
            },
            mode: 'y',
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    Tokens.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' + Tokens.queryDetails;

  static readonly logSearchQuery = Tokens.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = Tokens.logCountQuery +
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
  static readonly chartHeading = 'Daily Token Transactions'
  static readonly logHeading = 'Daily Token Transactions'

  static readonly regex = '^0x[A-Z0-9][A-Z0-9]+'

  static readonly chartKey = shortid.generate();

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.tables.txpow.name + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.insert + '\')' +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + DailyTokens.regex + '\'';

  static readonly queryWithDate = DailyTokens.queryDetails +
    ' AND (DATE BETWEEN <firstTime> AND <secondTime>)';

  static readonly query = 'SELECT * FROM ' + DailyTokens.queryWithDate;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' +
    DailyTokens.queryWithDate;
  static readonly searchQuery = DailyTokens.query +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = DailyTokens.countQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly chartCountKey =
    'COUNT(FROM_UNIXTIME(' + Dbase.tables.log.columns[1] + '/1000))';
  static readonly chartDataKey =
    'DATE(FROM_UNIXTIME(' + Dbase.tables.log.columns[1] + '/1000))';
  static readonly chartQuery = 'SELECT ' +
    DailyTokens.chartCountKey + ', ' +
    DailyTokens.chartDataKey +
    ' FROM ' + DailyTokens.queryWithDate +
    ' GROUP BY DAY(FROM_UNIXTIME(' + Dbase.tables.log.columns[1] + '/1000)), ' +
    DailyTokens.chartDataKey;

  static readonly chartSearchQuery = 'SELECT ' +
    DailyTokens.chartCountKey + ', ' +
    DailyTokens.chartDataKey +
    ' FROM ' + DailyTokens.queryWithDate +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'' +
    ' GROUP BY DAY(FROM_UNIXTIME(' + Dbase.tables.log.columns[1] + '/1000)), ' +
    DailyTokens.chartDataKey;

  static readonly chart: ChartType = {
    name: DailyTokens.chartHeading,
    key: DailyTokens.chartKey,
    query: DailyTokens.chartQuery,
    countQuery: DailyTokens.countQuery,
    searchQuery: DailyTokens.chartSearchQuery,
    searchCountQuery: DailyTokens.searchCountQuery,
    countColumn: DailyTokens.chartCountKey,
    dataColumn: DailyTokens.chartDataKey,
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      plugins: {
        legend: {
          display: false,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
              speed: 1,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    DailyTokens.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery =
    'SELECT COUNT(*) FROM ' + DailyTokens.queryDetails;

  static readonly logSearchQuery = DailyTokens.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = DailyTokens.logCountQuery +
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
  static readonly chartHeading = 'API Calls'
  static readonly logHeading = 'API Calls'

  // Stuff to make the charts and logs work
  static readonly regex = '^[a-zA-Z0-9]+'

  static readonly chartKey = shortid.generate();

  static readonly queryDetails = Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + Dbase.tables.trigger.name + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + Dbase.defaultActions.run + '\')' +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + API.regex + '\'';

  static readonly queryWithDate =
    API.queryDetails + ' AND (DATE BETWEEN <firstTime> AND <secondTime>)';

  // eslint-disable-next-line max-len
  // SELECT COUNT(DATA), DATA FROM LOGGING WHERE LOGGINGTYPE IN('API') AND ACTION IN('run') AND DATA REGEXP '^[a-zA-Z0-9]+' GROUP BY DATA;
  static readonly query = 'SELECT * FROM ' + API.queryWithDate;
  static readonly countQuery = 'SELECT COUNT(*) FROM ' + API.queryWithDate;

  static readonly searchQuery = API.query +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly searchCountQuery = API.countQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly chartCountKey = 'COUNT(' + Dbase.tables.log.columns[4] + ')';
  static readonly chartDataKey = Dbase.tables.log.columns[4];
  static readonly chartQuery = 'SELECT ' +
    API.chartCountKey + ', ' +
    API.chartDataKey +
    ' FROM ' + API.queryWithDate +
    ' GROUP BY ' + API.chartDataKey;

  static readonly chartSearchQuery = 'SELECT ' +
    API.chartCountKey + ', ' +
    API.chartDataKey +
    ' FROM ' + API.queryWithDate +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'' +
    ' GROUP BY ' + API.chartDataKey;

  static readonly chart: ChartType = {
    name: API.chartHeading,
    key: API.chartKey,
    query: API.chartQuery,
    countQuery: API.countQuery,
    searchQuery: API.chartSearchQuery,
    searchCountQuery: API.searchCountQuery,
    countColumn: API.chartCountKey,
    dataColumn: API.chartDataKey,
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      barThickness: Misc.barThickness,
      maxBarThickness: Misc.barThickness + 2,
      plugins: {
        legend: {
          display: false,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
              speed: 1,
            },
            pinch: {
              enabled: true,
            },
            mode: 'y',
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#000000',
            mirror: true,
            labelOffset: Misc.labelOffset,
            z: 1,
          },
        },
        x: {
          position: 'top',
          grid: {
            display: false,
          },
        },
      },
    },
  }

  static readonly logKey = shortid.generate();

  static readonly logQuery = 'SELECT * FROM ' +
    API.queryDetails +
    ' ORDER BY DATE DESC';

  static readonly logCountQuery = 'SELECT COUNT(*) FROM ' + API.queryDetails;

  static readonly logSearchQuery = API.queryDetails +
    ' AND ' + Dbase.tables.log.columns[4] +
    ' LIKE \'%<searchTerm>%\'';

  static readonly logSearchCountQuery = API.logCountQuery +
  ' AND ' + Dbase.tables.log.columns[4] +
  ' LIKE \'%<searchTerm>%\'';

  static readonly apiLog: LogType = {
    name: API.logHeading,
    key: API.logKey,
    query: API.logQuery,
    countQuery: API.logCountQuery,
    searchQuery: API.logSearchQuery,
    searchCountQuery: API.logSearchCountQuery,
  }
}

export {
  Cmd,
  Addresses,
  Tokens,
  DailyTokens,
  API,
};

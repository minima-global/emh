import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

// Store stuff
export interface ApplicationState {
  appData: AppDataProps
  logsData: LogsProps
  cmdData: CmdProps,
  tx: TxProps
}

export interface PayloadProps {
  data: object
}

export interface ActionProps extends Action {
  type: string
  payload: PayloadProps
}

export type AppDispatch = ThunkDispatch<ApplicationState, any, ActionProps>

// Stuff pertinent to make this app' work
export const enum PageTypes {
  AUTHENTICATED = 'signedIn',
  SIGNIN = 'signin',
  ABOUT = 'about',
  HELP = 'help',
  CONTACT = 'contact'
}

export interface AppData {
  activePage: PageTypes
}

export interface AppDataProps extends PayloadProps {
  data: AppData
}

export interface InfoProps {
  title: string
  data: string[]
}

// cmd stuff
export interface CmdProps extends PayloadProps {
  data: Array<object>
}

// Logs
export interface Logs {
  id: number
  date: string
  loggingtype: string
  data: string
  loggingtypeid: string
}

export interface LogsProps extends PayloadProps {
  data: Array<Logs>
}

// Tx stuff
export interface TxData {
  code: string
  summary: string
  time: string
}

export interface TxProps extends PayloadProps {
  data: TxData
}

export type SelectOptionType = {
  value: string
  label: string
}

// Action types
export const enum AppDataActionTypes {
  APPDATA_INIT = '@@AppDataActionTypes/APPDATA_INIT',
  APPDATA_SUCCESS = '@@AppDataActionTypes/APPDATA_SUCCESS',
  APPDATA_FAILURE = '@@AppDataActionTypes/APPDATA_FAILURE'
}

// put action types
export const enum TxActionTypes {
  TX_INIT = '@@TxActionTypes/TX_INIT',
  TX_PENDING = '@@TxActionTypes/TX_PENDING',
  TX_SUCCESS = '@@TxActionTypes/TX_SUCCESS',
  TX_FAILURE = '@@TxActionTypes/TX_FAILURE'
}

export const enum CmdActionTypes {
  CMD_SUCCESS = '@@CmdActionTypes/CMD_SUCCESS',
  CMD_FAILURE = '@@CmdActionTypes/CMD_FAILURE'
}

export const enum LogsActionTypes {
  LOGS_INIT = '@@LogsActionTypes/LOGS_INIT',
  LOGS_SUCCESS = '@@LogsActionTypes/LOGS_SUCCESS',
  LOGS_FAILURE = '@@LogsActionTypes/LOGS_FAILURE'
}

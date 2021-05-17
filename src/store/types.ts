import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

/**
 * Store stuff
*/
export interface ApplicationState {
  logsData: LogsProps
  callsData: CallsProps,
  tokensData: TokensProps,
  triggersData: TriggersProps,
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

/**
 * Static info props
 */
export interface InfoProps {
  title: string
  data: string[]
}

/**
 * cmd stuff
*/
export interface CmdProps extends PayloadProps {
  data: Array<object>
}

/**
 * Logs
 */
export interface Logs {
  ID: number
  DATE: string
  LOGGINGTYPE: string
  DATA: string
  LOGGINGTYPEID: string
}

export interface LogsProps extends PayloadProps {
  data: Array<Logs>
}

/**
 * Calls
 */
export interface Calls {
  ADDRESS: string
  URL: string
}

export interface CallsProps extends PayloadProps {
  data: Array<Calls>
}

/**
 * Tokens
 */
export interface Tokens {
  ID: string
  URL: string
}

export interface TokensProps extends PayloadProps {
  data: Array<Tokens>
}

/**
 * Triggers
 */
export interface Triggers {
  ENDPOINT: string
  COMMAND: string
  SETPARAMS: string
  PARAMS: string
}

export interface TriggersProps extends PayloadProps {
  data: Array<Triggers>
}

/**
 * Tx stuff
 */
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

/**
 *  Enums that make this app' work
 */

export const enum PageTypes {
  ABOUT = 'about',
  HELP = 'help',
  CONTACT = 'contact'
}

/**
 * Action Types
 */
export const enum AppDataActionTypes {
  APPDATA_INIT = '@@AppDataActionTypes/APPDATA_INIT',
  APPDATA_SUCCESS = '@@AppDataActionTypes/APPDATA_SUCCESS',
  APPDATA_FAILURE = '@@AppDataActionTypes/APPDATA_FAILURE'
}

export const enum TxActionTypes {
  TX_INIT = '@@TxActionTypes/TX_INIT',
  TX_PENDING = '@@TxActionTypes/TX_PENDING',
  TX_SUCCESS = '@@TxActionTypes/TX_SUCCESS',
  TX_FAILURE = '@@TxActionTypes/TX_FAILURE'
}

export const enum CmdActionTypes {
  CMD_INIT = '@@CmdActionTypes/CMD_INIT',
  CMD_SUCCESS = '@@CmdActionTypes/CMD_SUCCESS',
  CMD_FAILURE = '@@CmdActionTypes/CMD_FAILURE'
}

export const enum LogsActionTypes {
  LOGS_INIT = '@@LogsActionTypes/LOGS_INIT',
  LOGS_SUCCESS = '@@LogsActionTypes/LOGS_SUCCESS',
  LOGS_FAILURE = '@@LogsActionTypes/LOGS_FAILURE'
}

export const enum CallActionTypes {
  CALL_INIT = '@@CallActionTypes/CALL_INIT',
  CALL_SUCCESS = '@@CallActionTypes/CALL_SUCCESS',
  CALL_FAILURE = '@@CallActionTypes/CALL_FAILURE'
}

export const enum TokenActionTypes {
  TOKEN_INIT = '@@TokenActionTypes/TOKEN_INIT',
  TOKEN_SUCCESS = '@@TokenActionTypes/TOKEN_SUCCESS',
  TOKEN_FAILURE = '@@TokenActionTypes/TOKEN_FAILURE'
}

export const enum TriggerActionTypes {
  TRIGGER_INIT = '@@TriggerActionTypes/TRIGGER_INIT',
  TRIGGER_SUCCESS = '@@TriggerActionTypes/TRIGGER_SUCCESS',
  TRIGGER_FAILURE = '@@TriggerActionTypes/TRIGGER_FAILURE'
}

export type ActionTypes =
  AppDataActionTypes |
  TxActionTypes |
  CmdActionTypes |
  LogsActionTypes |
  CallActionTypes |
  TokenActionTypes |
  TriggerActionTypes;

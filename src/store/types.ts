/* eslint-disable no-unused-vars */
import Decimal from 'decimal.js';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

/**
 * Store stuff
*/
export interface ApplicationState {
  balanceData: BalanceProps,
  statusData: StatusProps,
  tokensData: TokenProps,
  logsData: LogsProps
  addressData: AddressProps,
  tokenIdsData: TokenIdProps,
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
 * Minima token balances
 */
export interface Balance {
  tokenid: string;
  token: string;
  total: string;
  sendable: string;
  unconfirmed: string;
  confirmed: string;
  decimals: string;
  mempool: string;
  coinid?: string;
  totalamount?: string;
  scale?: string;
  description?: string;
  icon?: string;
  proof?: string;
  script?: string;
}

export interface BalanceProps extends PayloadProps {
  data: Array<Balance>
}

/**
 * Minima token info
 */

export interface Token {
  coinid: string
  decimals: string
  description: string
  icon: string
  proof: string
  scale: string
  script: string
  token: string
  tokenid: string
  total: string
  totalamount: string
}

export interface TokenProps extends PayloadProps {
  data: Array<Token>
}

/**
 * Minima status info
 */

export interface Status {
  automine: boolean
  cascade: string
  chainlength: number
  chainspeed: Decimal
  chainweight: string
  conf: string
  connections: number
  difficulty: string
  host: string
  lastblock: string
  lasttime: string
  mempoolcoins: number
  mempooltxn: number
  minidappserver: number
  minimaport: number
  ram: string
  root: string
  rpcport: number
  time: string
  tip: string
  total: string
  txpowdb: number
  uptime: string
  version: string
  websocketport: number
}

export interface StatusProps extends PayloadProps {
  data: Array<Status>
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

// Database definitions

/**
 * Logs database table
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
 * Address database table
 */
export interface Address {
  ADDRESS: string
  URL: string
}

export interface AddressProps extends PayloadProps {
  data: Array<Address>
}

/**
 * Tokens database table
 */
export interface TokenId {
  TOKENID: string
  URL: string
}

export interface TokenIdProps extends PayloadProps {
  data: Array<TokenId>
}

/**
 * Triggers database table
 */
export interface Triggers {
  ENDPOINT: string
  CMD: string
  FORMAT: string
  SETPARAMS: string
  PARAMS: string
  ISPUBLIC: string
}

export interface TriggersProps extends PayloadProps {
  data: Array<Triggers>
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

export const enum TxPoWActionTypes {
  TXPOW_INIT = '@@TxActionTypes/TXPOW_INIT',
  TXPOW_SUCCESS = '@@TxActionTypes/TXPOW_SUCCESS',
  TXPOW_FAILURE = '@@TxActionTypes/TXPOW_FAILURE'
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

export const enum AddressActionTypes {
  ADDRESS_INIT = '@@AddressActionTypes/ADDRESS_INIT',
  ADDRESS_SUCCESS = '@@AddressActionTypes/ADDRESS_SUCCESS',
  ADDRESS_FAILURE = '@@AddressActionTypes/ADDRESS_FAILURE'
}

export const enum TokenIdActionTypes {
  TOKENID_INIT = '@@TokenIdActionTypes/TOKENID_INIT',
  TOKENID_SUCCESS = '@@TokenIdActionTypes/TOKENID_SUCCESS',
  TOKENID_FAILURE = '@@TokenIdActionTypes/TOKENID_FAILURE'
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

export const enum BalanceActionTypes {
  BALANCE_INIT = '@@BalanceActionTypes/BALANCE_INIT',
  BALANCE_SUCCESS = '@@BalanceActionTypes/BALANCE_SUCCESS',
  BALANCE_FAILURE = '@@BalanceActionTypes/BALANCE_FAILURE'
}

export const enum StatusActionTypes {
  STATUS_INIT = '@@StatusActionTypes/STATUS_INIT',
  STATUS_SUCCESS = '@@StatusActionTypes/STATUS_SUCCESS',
  STATUS_FAILURE = '@@StatusActionTypes/STATUS_FAILURE'
}
export type ActionTypes =
  AppDataActionTypes |
  TxActionTypes |
  TxPoWActionTypes |
  CmdActionTypes |
  LogsActionTypes |
  AddressActionTypes |
  TokenIdActionTypes |
  TokenActionTypes |
  TriggerActionTypes |
  BalanceActionTypes |
  StatusActionTypes;

export type SuccessAndFailType = {
  success: ActionTypes,
  fail: ActionTypes,
}

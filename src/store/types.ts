/* eslint-disable no-unused-vars */
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

import {Token as Balance, NetworkStatus as Status} from 'minima';

/**
 * Store stuff
*/
export interface ApplicationState {
  chartsData: ChartProps,
  balanceData: BalanceProps,
  statusData: StatusProps,
  logsData: LogsProps
  addressData: AddressProps,
  tokenIdsData: TokenIdProps,
  triggersData: TriggersProps,
  cmdData: CmdProps,
  countData: CountProps,
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
 * Chart types
 */
export type ChartData = {
  [key: string]: number
}

export interface ChartProps extends PayloadProps {
  data: Array<ChartData>
}

export type ChartUpdateData = {
  data: ChartData
  index: number
}

export type ChartType = {
  name: string
  regex: string
  query: string
  countQuery: string
  searchQuery: string
  searchCountQuery: string
  type: string
  options: object
}

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
  data: object
}

/**
 * Balance stuff
*/
export interface BalanceProps extends PayloadProps {
  data: Array<Balance>
}

/**
 * Minima status
 */
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

// Database definitions

/**
 * Logs database table
 */
export interface Logs {
  ID: number
  DATE: string
  LOGGINGTYPE: string
  ACTION: string
  DATA: string
}

export interface LogsProps extends PayloadProps {
  data: Array<Logs>
}

export type LogType = {
  name: string
  query: string
  countQuery: string
  searchQuery: string
  searchCountQuery: string
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
 * Misc
 */
export type SelectOptionType = {
  value: string
  label: string
}

// Keep a count of rows returned by a query
export type CountData = {
  [key: string]: number
}

export interface CountProps extends PayloadProps {
  data: CountData
}

export type CountUpdateData = {
  count: number
  key: string
}

/**
 * Action Types
 */
export const enum ChartsActionTypes {
  CHARTS_INIT = '@@ChartsActionTypes/CHARTS_INIT',
  CHARTS_SUCCESS = '@@ChartsActionTypes/CHARTS_SUCCESS',
  CHARTS_FAILURE = '@@ChartsActionTypes/CHARTS_FAILURE'
}

export const enum AppDataActionTypes {
  APPDATA_INIT = '@@AppDataActionTypes/APPDATA_INIT',
  APPDATA_SUCCESS = '@@AppDataActionTypes/APPDATA_SUCCESS',
  APPDATA_FAILURE = '@@AppDataActionTypes/APPDATA_FAILURE'
}

export const enum CountActionTypes {
  COUNT_INIT = '@@CountActionTypes/COUNT_INIT',
  COUNT_SUCCESS = '@@CountActionTypes/COUNT_SUCCESS',
  COUNT_FAILURE = '@@CountActionTypes/COUNT_FAILURE'
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
  ChartsActionTypes |
  AppDataActionTypes |
  CountActionTypes |
  TxActionTypes |
  TxPoWActionTypes |
  CmdActionTypes |
  LogsActionTypes |
  AddressActionTypes |
  TokenIdActionTypes |
  TriggerActionTypes |
  BalanceActionTypes |
  StatusActionTypes;

export type SuccessAndFailType = {
  success: ActionTypes,
  fail: ActionTypes,
}

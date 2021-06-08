/* eslint-disable no-unused-vars */
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

/**
 * Store stuff
*/
export interface ApplicationState {
  balance: BalanceProps
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

export type SelectOptionType = {
  value: string
  label: string
}

/**
 * Static info props
 */
export interface InfoProps {
  title: string
  data: string[]
}

/**
 * Send info
 */
 export interface NewSend {
  amount: number
  address: string
  tokenid: string
  statevars: string
}

/**
 * Minima token info
 */
export interface NewToken {
  name: string
  amount: number
  description: string
  script: string
  icon: string
  proof: string
}

/**
 * Balance stuff
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

export const enum BalanceActionTypes {
  GET_BALANCES = '@@BalanceActionTypes/GET_BALANCES'
}

export const enum TxActionTypes {
  TX_INIT = '@@TxActionTypes/TX_INIT',
  TX_PENDING = '@@TxActionTypes/TX_PENDING',
  TX_SUCCESS = '@@TxActionTypes/TX_SUCCESS',
  TX_FAILURE = '@@TxActionTypes/TX_FAILURE'
}

export type ActionTypes =
  AppDataActionTypes |
  TxActionTypes;

export type SuccessAndFailType = {
  success: ActionTypes,
  fail: ActionTypes,
}

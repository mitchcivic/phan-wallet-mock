import { EventEmitter } from '@solana/wallet-adapter-base'
import { Transaction, TransactionError } from '@solana/web3.js'
import { PhantomWalletMock } from './phan-wallet-mock'
import {BraveWalletMock} from "./brave-wallet-mock";

export interface PhantomWalletEvents {
  connect(...args: unknown[]): unknown
  disconnect(...args: unknown[]): unknown
}

/**
 * This interface matches the Phantom Wallet interface as expected in the solana
 * wallet-adapter.
 * {@link https://github.com/solana-labs/wallet-adapter/blob/master/packages/wallets/phantom/src/adapter.ts}
 */
export interface PhantomWallet extends EventEmitter<PhantomWalletEvents> {
  isPhantom?: boolean
  publicKey?: { toBytes(): Uint8Array }
  isConnected: boolean
  signTransaction(transaction: Transaction): Promise<Transaction>
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>
  connect(): Promise<void>
  disconnect(): Promise<void>
  _handleDisconnect(...args: unknown[]): unknown
}

export type WindowWithPhanWalletMock = typeof window & {
  solana: PhantomWalletMock
}
export type WindowWithMaybePhanWalletMock = typeof window & {
  solana: PhantomWalletMock | undefined
}
export type WindowWithPhanWallet = typeof window & { solana: PhantomWallet }
export type WindowWithMaybePhanWallet = typeof window & {
  solana: PhantomWallet | undefined
}

export interface BraveWalletEvents {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
}

export interface BraveWalletEvents {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
}
/**
 * This interface matches the Brave Wallet interface as expected in the solana
 * wallet-adapter.
 * {@link https://github.com/solana-labs/wallet-adapter/blob/master/packages/wallets/brave/src/adapter.ts}
 */

export interface BraveWallet extends EventEmitter<BraveWalletEvents> {
  isBraveWallet?: boolean;
  publicKey?: { toBytes(): Uint8Array };
  isConnected: boolean;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
  signMessage(message: Uint8Array): Promise<{
    signature: Uint8Array;
  }>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  _handleDisconnect(...args: unknown[]): unknown;
}

export declare type WindowWithBraveWalletMock = typeof window & {
  braveSolana: BraveWalletMock;
};
export declare type WindowWithMaybeBraveWalletMock = typeof window & {
  braveSolana: BraveWalletMock | undefined;
};
export declare type WindowWithBraveWallet = typeof window & {
  braveSolana: BraveWallet;
};
export declare type WindowWithMaybeBraveWallet = typeof window & {
  braveSolana: BraveWallet;
};

export type TransactionSummary = {
  logMessages: string[]
  fee: number | undefined
  slot: number
  blockTime: number
  err: TransactionError | null | undefined
}

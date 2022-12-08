import { Commitment, ConfirmedTransaction, Connection, ConnectionConfig, Finality, Keypair, RpcResponseAndContext, SignatureResult, Signer, Transaction } from '@solana/web3.js';
export * from './types';
import { EventEmitter } from 'eventemitter3';
import { BraveWallet, BraveWalletEvents, TransactionSummary } from './types';
export declare const DEVNET: string;
export declare const TESTNET: string;
export declare const MAINNET_BETA: string;
export declare const LOCALNET = "http://127.0.0.1:8899";
/**
 * Behaves as much as possible as the original which is why care needs to be taken when using it.
 *
 * The main difference is that no user confirmation is required to approve a
 * transaction or signature.
 *
 * This means that user approval is automatic!
 *
 */
export declare class BraveWalletMock extends EventEmitter<BraveWalletEvents> implements BraveWallet {
    private readonly _connectionURL;
    private _keypair;
    private readonly _commitmentOrConfig?;
    readonly isBraveWallet = true;
    private _signer;
    private _connection;
    private _transactionSignatures;
    private constructor();
    _signerFromKeypair(keypair: Keypair): {
        publicKey: import("@solana/web3.js").PublicKey;
        secretKey: Uint8Array;
    };
    /**
     * The underlying connection to a fullnode JSON RPC endpoint
     */
    get connection(): Connection;
    /**
     * `true` if the wallet was connected via {@link BraveWalletMock#connect}
     */
    get isConnected(): boolean;
    /**
     * Public key of the currently used wallet.
     */
    get publicKey(): import("@solana/web3.js").PublicKey;
    /**
     * Secret key of the currently used wallet.
     * @category TestAPI
     */
    get secretKey(): string;
    /**
     * {@link Signer} of the currently used wallet.
     */
    get signer(): Signer;
    /**
     * Connection URL used for the underlying connection.
     * @category TestAPI
     */
    get connectionURL(): string;
    /**
     * Default commitment used for transactions.
     * @category TestAPI
     */
    get commitment(): Commitment | undefined;
    /**
     * All transactions signatures made since wallet was created ordered oldest to most recent.
     * @category TestAPI
     */
    get transactionSignatures(): string[];
    /**
     * Fetch the balance for the wallet's account.
     * @category TestAPI
     */
    getBalance(commitment?: Commitment): Promise<number>;
    /**
     * Fetch the balance in Sol for the wallet's account.
     * @category TestAPI
     */
    getBalanceSol(commitment?: Commitment): Promise<number>;
    /**
     * Fetches transaction details for the last confirmed transaction signed with this wallet.
     * @category TestAPI
     */
    getLastConfirmedTransaction(commitment?: Finality): Promise<null | ConfirmedTransaction>;
    /**
     * Fetches transaction details for the last confirmed transaction signed with this wallet and
     * returns its summary.
     * @category TestAPI
     */
    lastConfirmedTransactionSummary(commitment?: Finality): Promise<TransactionSummary | undefined>;
    /**
     * Fetches transaction details for the last confirmed transaction signed with this wallet and
     * returns its summary that can be used to log it to the console.
     * @category TestAPI
     */
    lastConfirmedTransactionString(commitment?: Finality): Promise<string>;
    /**
     * Signs the transaction using the current wallet.
     */
    signTransaction(txIn: Transaction): Promise<Transaction>;
    /**
     * Signs all transactions using the current wallet.
     */
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    /**
     * Signs the message using the current wallet.
     */
    signMessage(message: Uint8Array): Promise<{
        signature: Uint8Array;
    }>;
    /**
     * Connects the wallet to the URL provided on wallet creation.
     * This needs to be called before attempting to sign messages or transactions.
     *
     * emits 'connect'
     */
    connect(): Promise<void>;
    /**
     * Disconnects the wallet.
     *
     * emits 'disconnect'
     */
    disconnect(): Promise<void>;
    _handleDisconnect(...args: unknown[]): unknown;
    /**
     * Drops sol to the currently connected wallet.
     * @category TestAPI
     */
    requestAirdrop(sol: number): Promise<RpcResponseAndContext<SignatureResult>>;
    /**
     * Changes the Wallet to the provided keypair
     * This updates the signer as well.
     * @category TestAPI
     */
    changeWallet(keypair: Keypair): void;
    /**
     * Creates a {@see BraveWalletMock} instance with the provided info.
     *
     * @param connectionURL cluster to connect to, i.e. `https://api.devnet.solana.com` or `http://127.0.0.1:8899`
     * @param keypair the private and public key of the wallet to use, i.e. the payer/signer
     * @param commitmentOrConfig passed to the {@link * https://solana-labs.github.io/solana-web3.js/classes/Connection.html#constructor }
     *                           when creating a connection to the cluster
     */
    static create: (connectionURL: string, keypair?: Keypair, commitmentOrConfig?: Commitment | ConnectionConfig | undefined) => BraveWalletMock;
}
export declare const initWalletMockProvider: (winin: Window) => {
    wallet: BraveWalletMock;
    payer: Keypair;
};

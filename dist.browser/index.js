var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import assert from 'assert';
import BN from 'bn.js';
import { Buffer } from 'buffer';
import * as BufferLayout from '@solana/buffer-layout';
import { PublicKey, SystemProgram, Transaction, TransactionInstruction, } from '@solana/web3.js';
import * as Layout from './layout';
import { sendAndConfirmTransaction } from './util/send-and-confirm-transaction';
import { loadAccount } from './util/account';
export var TOKEN_SWAP_PROGRAM_ID = new PublicKey('SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8');
/**
 * Some amount of tokens
 */
var Numberu64 = /** @class */ (function (_super) {
    __extends(Numberu64, _super);
    function Numberu64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Convert to Buffer representation
     */
    Numberu64.prototype.toBuffer = function () {
        var a = _super.prototype.toArray.call(this).reverse();
        var b = Buffer.from(a);
        if (b.length === 8) {
            return b;
        }
        assert(b.length < 8, 'Numberu64 too large');
        var zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        return zeroPad;
    };
    /**
     * Construct a Numberu64 from Buffer representation
     */
    Numberu64.fromBuffer = function (buffer) {
        assert(buffer.length === 8, "Invalid buffer length: ".concat(buffer.length));
        return new Numberu64(__spreadArray([], __read(buffer), false).reverse()
            .map(function (i) { return "00".concat(i.toString(16)).slice(-2); })
            .join(''), 16);
    };
    return Numberu64;
}(BN));
export { Numberu64 };
export var TokenSwapLayout = BufferLayout.struct([
    BufferLayout.u8('version'),
    BufferLayout.u8('isInitialized'),
    BufferLayout.u8('bumpSeed'),
    Layout.publicKey('tokenProgramId'),
    Layout.publicKey('tokenAccountA'),
    Layout.publicKey('tokenAccountB'),
    Layout.publicKey('tokenPool'),
    Layout.publicKey('mintA'),
    Layout.publicKey('mintB'),
    Layout.publicKey('feeAccount'),
    Layout.uint64('tradeFeeNumerator'),
    Layout.uint64('tradeFeeDenominator'),
    Layout.uint64('ownerTradeFeeNumerator'),
    Layout.uint64('ownerTradeFeeDenominator'),
    Layout.uint64('ownerWithdrawFeeNumerator'),
    Layout.uint64('ownerWithdrawFeeDenominator'),
    Layout.uint64('hostFeeNumerator'),
    Layout.uint64('hostFeeDenominator'),
    BufferLayout.u8('curveType'),
    BufferLayout.blob(32, 'curveParameters'),
]);
export var CurveType = Object.freeze({
    ConstantProduct: 0,
    ConstantPrice: 1,
    Offset: 3, // Offset curve, like Uniswap, but with an additional offset on the token B side
});
/**
 * A program to exchange tokens against a pool of liquidity
 */
var TokenSwap = /** @class */ (function () {
    /**
     * Create a Token object attached to the specific token
     *
     * @param connection The connection to use
     * @param tokenSwap The token swap account
     * @param swapProgramId The program ID of the token-swap program
     * @param tokenProgramId The program ID of the token program
     * @param poolToken The pool token
     * @param authority The authority over the swap and accounts
     * @param tokenAccountA The token swap's Token A account
     * @param tokenAccountB The token swap's Token B account
     * @param mintA The mint of Token A
     * @param mintB The mint of Token B
     * @param tradeFeeNumerator The trade fee numerator
     * @param tradeFeeDenominator The trade fee denominator
     * @param ownerTradeFeeNumerator The owner trade fee numerator
     * @param ownerTradeFeeDenominator The owner trade fee denominator
     * @param ownerWithdrawFeeNumerator The owner withdraw fee numerator
     * @param ownerWithdrawFeeDenominator The owner withdraw fee denominator
     * @param hostFeeNumerator The host fee numerator
     * @param hostFeeDenominator The host fee denominator
     * @param curveType The curve type
     * @param payer Pays for the transaction
     */
    function TokenSwap(connection, tokenSwap, swapProgramId, tokenProgramId, poolToken, feeAccount, authority, tokenAccountA, tokenAccountB, mintA, mintB, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, payer) {
        this.connection = connection;
        this.tokenSwap = tokenSwap;
        this.swapProgramId = swapProgramId;
        this.tokenProgramId = tokenProgramId;
        this.poolToken = poolToken;
        this.feeAccount = feeAccount;
        this.authority = authority;
        this.tokenAccountA = tokenAccountA;
        this.tokenAccountB = tokenAccountB;
        this.mintA = mintA;
        this.mintB = mintB;
        this.tradeFeeNumerator = tradeFeeNumerator;
        this.tradeFeeDenominator = tradeFeeDenominator;
        this.ownerTradeFeeNumerator = ownerTradeFeeNumerator;
        this.ownerTradeFeeDenominator = ownerTradeFeeDenominator;
        this.ownerWithdrawFeeNumerator = ownerWithdrawFeeNumerator;
        this.ownerWithdrawFeeDenominator = ownerWithdrawFeeDenominator;
        this.hostFeeNumerator = hostFeeNumerator;
        this.hostFeeDenominator = hostFeeDenominator;
        this.curveType = curveType;
        this.payer = payer;
        this.connection = connection;
        this.tokenSwap = tokenSwap;
        this.swapProgramId = swapProgramId;
        this.tokenProgramId = tokenProgramId;
        this.poolToken = poolToken;
        this.feeAccount = feeAccount;
        this.authority = authority;
        this.tokenAccountA = tokenAccountA;
        this.tokenAccountB = tokenAccountB;
        this.mintA = mintA;
        this.mintB = mintB;
        this.tradeFeeNumerator = tradeFeeNumerator;
        this.tradeFeeDenominator = tradeFeeDenominator;
        this.ownerTradeFeeNumerator = ownerTradeFeeNumerator;
        this.ownerTradeFeeDenominator = ownerTradeFeeDenominator;
        this.ownerWithdrawFeeNumerator = ownerWithdrawFeeNumerator;
        this.ownerWithdrawFeeDenominator = ownerWithdrawFeeDenominator;
        this.hostFeeNumerator = hostFeeNumerator;
        this.hostFeeDenominator = hostFeeDenominator;
        this.curveType = curveType;
        this.payer = payer;
    }
    /**
     * Get the minimum balance for the token swap account to be rent exempt
     *
     * @return Number of lamports required
     */
    TokenSwap.getMinBalanceRentForExemptTokenSwap = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(TokenSwapLayout.span)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenSwap.createInitSwapInstruction = function (tokenSwapAccount, authority, tokenAccountA, tokenAccountB, tokenPool, feeAccount, tokenAccountPool, tokenProgramId, swapProgramId, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, curveParameters) {
        if (curveParameters === void 0) { curveParameters = new Numberu64(0); }
        var keys = [
            { pubkey: tokenSwapAccount.publicKey, isSigner: false, isWritable: true },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: tokenAccountA, isSigner: false, isWritable: false },
            { pubkey: tokenAccountB, isSigner: false, isWritable: false },
            { pubkey: tokenPool, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: false },
            { pubkey: tokenAccountPool, isSigner: false, isWritable: true },
            { pubkey: tokenProgramId, isSigner: false, isWritable: false },
        ];
        var commandDataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.nu64('tradeFeeNumerator'),
            BufferLayout.nu64('tradeFeeDenominator'),
            BufferLayout.nu64('ownerTradeFeeNumerator'),
            BufferLayout.nu64('ownerTradeFeeDenominator'),
            BufferLayout.nu64('ownerWithdrawFeeNumerator'),
            BufferLayout.nu64('ownerWithdrawFeeDenominator'),
            BufferLayout.nu64('hostFeeNumerator'),
            BufferLayout.nu64('hostFeeDenominator'),
            BufferLayout.u8('curveType'),
            BufferLayout.blob(32, 'curveParameters'),
        ]);
        var data = Buffer.alloc(1024);
        // package curve parameters
        // NOTE: currently assume all curves take a single parameter, u64 int
        //       the remaining 24 of the 32 bytes available are filled with 0s
        var curveParamsBuffer = Buffer.alloc(32);
        curveParameters.toBuffer().copy(curveParamsBuffer);
        {
            var encodeLength = commandDataLayout.encode({
                instruction: 0,
                tradeFeeNumerator: tradeFeeNumerator,
                tradeFeeDenominator: tradeFeeDenominator,
                ownerTradeFeeNumerator: ownerTradeFeeNumerator,
                ownerTradeFeeDenominator: ownerTradeFeeDenominator,
                ownerWithdrawFeeNumerator: ownerWithdrawFeeNumerator,
                ownerWithdrawFeeDenominator: ownerWithdrawFeeDenominator,
                hostFeeNumerator: hostFeeNumerator,
                hostFeeDenominator: hostFeeDenominator,
                curveType: curveType,
                curveParameters: curveParamsBuffer,
            }, data);
            data = data.slice(0, encodeLength);
        }
        return new TransactionInstruction({
            keys: keys,
            programId: swapProgramId,
            data: data,
        });
    };
    TokenSwap.loadTokenSwap = function (connection, address, programId, payer) {
        return __awaiter(this, void 0, void 0, function () {
            var data, tokenSwapData, _a, authority, poolToken, feeAccount, tokenAccountA, tokenAccountB, mintA, mintB, tokenProgramId, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, loadAccount(connection, address, programId)];
                    case 1:
                        data = _b.sent();
                        tokenSwapData = TokenSwapLayout.decode(data);
                        if (!tokenSwapData.isInitialized) {
                            throw new Error("Invalid token swap state");
                        }
                        return [4 /*yield*/, PublicKey.findProgramAddress([address.toBuffer()], programId)];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 1]), authority = _a[0];
                        poolToken = new PublicKey(tokenSwapData.tokenPool);
                        feeAccount = new PublicKey(tokenSwapData.feeAccount);
                        tokenAccountA = new PublicKey(tokenSwapData.tokenAccountA);
                        tokenAccountB = new PublicKey(tokenSwapData.tokenAccountB);
                        mintA = new PublicKey(tokenSwapData.mintA);
                        mintB = new PublicKey(tokenSwapData.mintB);
                        tokenProgramId = new PublicKey(tokenSwapData.tokenProgramId);
                        tradeFeeNumerator = Numberu64.fromBuffer(tokenSwapData.tradeFeeNumerator);
                        tradeFeeDenominator = Numberu64.fromBuffer(tokenSwapData.tradeFeeDenominator);
                        ownerTradeFeeNumerator = Numberu64.fromBuffer(tokenSwapData.ownerTradeFeeNumerator);
                        ownerTradeFeeDenominator = Numberu64.fromBuffer(tokenSwapData.ownerTradeFeeDenominator);
                        ownerWithdrawFeeNumerator = Numberu64.fromBuffer(tokenSwapData.ownerWithdrawFeeNumerator);
                        ownerWithdrawFeeDenominator = Numberu64.fromBuffer(tokenSwapData.ownerWithdrawFeeDenominator);
                        hostFeeNumerator = Numberu64.fromBuffer(tokenSwapData.hostFeeNumerator);
                        hostFeeDenominator = Numberu64.fromBuffer(tokenSwapData.hostFeeDenominator);
                        curveType = tokenSwapData.curveType;
                        return [2 /*return*/, new TokenSwap(connection, address, programId, tokenProgramId, poolToken, feeAccount, authority, tokenAccountA, tokenAccountB, mintA, mintB, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, payer)];
                }
            });
        });
    };
    /**
     * Create a new Token Swap
     *
     * @param connection The connection to use
     * @param payer Pays for the transaction
     * @param tokenSwapAccount The token swap account
     * @param authority The authority over the swap and accounts
     * @param tokenAccountA: The token swap's Token A account
     * @param tokenAccountB: The token swap's Token B account
     * @param poolToken The pool token
     * @param tokenAccountPool The token swap's pool token account
     * @param tokenProgramId The program ID of the token program
     * @param swapProgramId The program ID of the token-swap program
     * @param feeNumerator Numerator of the fee ratio
     * @param feeDenominator Denominator of the fee ratio
     * @return Token object for the newly minted token, Public key of the account holding the total supply of new tokens
     */
    TokenSwap.createTokenSwap = function (connection, payer, tokenSwapAccount, authority, tokenAccountA, tokenAccountB, poolToken, mintA, mintB, feeAccount, tokenAccountPool, swapProgramId, tokenProgramId, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, curveParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, tokenSwap, balanceNeeded, instruction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenSwap = new TokenSwap(connection, tokenSwapAccount.publicKey, swapProgramId, tokenProgramId, poolToken, feeAccount, authority, tokenAccountA, tokenAccountB, mintA, mintB, new Numberu64(tradeFeeNumerator), new Numberu64(tradeFeeDenominator), new Numberu64(ownerTradeFeeNumerator), new Numberu64(ownerTradeFeeDenominator), new Numberu64(ownerWithdrawFeeNumerator), new Numberu64(ownerWithdrawFeeDenominator), new Numberu64(hostFeeNumerator), new Numberu64(hostFeeDenominator), curveType, payer);
                        return [4 /*yield*/, TokenSwap.getMinBalanceRentForExemptTokenSwap(connection)];
                    case 1:
                        balanceNeeded = _a.sent();
                        transaction = new Transaction();
                        transaction.add(SystemProgram.createAccount({
                            fromPubkey: payer.publicKey,
                            newAccountPubkey: tokenSwapAccount.publicKey,
                            lamports: balanceNeeded,
                            space: TokenSwapLayout.span,
                            programId: swapProgramId,
                        }));
                        instruction = TokenSwap.createInitSwapInstruction(tokenSwapAccount, authority, tokenAccountA, tokenAccountB, poolToken, feeAccount, tokenAccountPool, tokenProgramId, swapProgramId, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, curveParameters);
                        transaction.add(instruction);
                        return [4 /*yield*/, sendAndConfirmTransaction('createAccount and InitializeSwap', connection, transaction, payer, tokenSwapAccount)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tokenSwap];
                }
            });
        });
    };
    /**
     * Swap token A for token B
     *
     * @param userSource User's source token account
     * @param poolSource Pool's source token account
     * @param poolDestination Pool's destination token account
     * @param userDestination User's destination token account
     * @param hostFeeAccount Host account to gather fees
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param amountIn Amount to transfer from source account
     * @param minimumAmountOut Minimum amount of tokens the user will receive
     */
    TokenSwap.prototype.swap = function (userSource, poolSource, poolDestination, userDestination, hostFeeAccount, userTransferAuthority, amountIn, minimumAmountOut) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendAndConfirmTransaction('swap', this.connection, new Transaction().add(TokenSwap.swapInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, userSource, poolSource, poolDestination, userDestination, this.poolToken, this.feeAccount, hostFeeAccount, this.swapProgramId, this.tokenProgramId, amountIn, minimumAmountOut)), this.payer, userTransferAuthority)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenSwap.swapInstruction = function (tokenSwap, authority, userTransferAuthority, userSource, poolSource, poolDestination, userDestination, poolMint, feeAccount, hostFeeAccount, swapProgramId, tokenProgramId, amountIn, minimumAmountOut) {
        var dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('amountIn'),
            Layout.uint64('minimumAmountOut'),
        ]);
        var data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 1,
            amountIn: new Numberu64(amountIn).toBuffer(),
            minimumAmountOut: new Numberu64(minimumAmountOut).toBuffer(),
        }, data);
        var keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: userSource, isSigner: false, isWritable: true },
            { pubkey: poolSource, isSigner: false, isWritable: true },
            { pubkey: poolDestination, isSigner: false, isWritable: true },
            { pubkey: userDestination, isSigner: false, isWritable: true },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: true },
            { pubkey: tokenProgramId, isSigner: false, isWritable: false },
        ];
        if (hostFeeAccount !== null) {
            keys.push({ pubkey: hostFeeAccount, isSigner: false, isWritable: true });
        }
        return new TransactionInstruction({
            keys: keys,
            programId: swapProgramId,
            data: data,
        });
    };
    /**
     * Deposit tokens into the pool
     * @param userAccountA User account for token A
     * @param userAccountB User account for token B
     * @param poolAccount User account for pool token
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param poolTokenAmount Amount of pool tokens to mint
     * @param maximumTokenA The maximum amount of token A to deposit
     * @param maximumTokenB The maximum amount of token B to deposit
     */
    TokenSwap.prototype.depositAllTokenTypes = function (userAccountA, userAccountB, poolAccount, userTransferAuthority, poolTokenAmount, maximumTokenA, maximumTokenB) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendAndConfirmTransaction('depositAllTokenTypes', this.connection, new Transaction().add(TokenSwap.depositAllTokenTypesInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, userAccountA, userAccountB, this.tokenAccountA, this.tokenAccountB, this.poolToken, poolAccount, this.swapProgramId, this.tokenProgramId, poolTokenAmount, maximumTokenA, maximumTokenB)), this.payer, userTransferAuthority)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenSwap.depositAllTokenTypesInstruction = function (tokenSwap, authority, userTransferAuthority, sourceA, sourceB, intoA, intoB, poolToken, poolAccount, swapProgramId, tokenProgramId, poolTokenAmount, maximumTokenA, maximumTokenB) {
        var dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('poolTokenAmount'),
            Layout.uint64('maximumTokenA'),
            Layout.uint64('maximumTokenB'),
        ]);
        var data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 2,
            poolTokenAmount: new Numberu64(poolTokenAmount).toBuffer(),
            maximumTokenA: new Numberu64(maximumTokenA).toBuffer(),
            maximumTokenB: new Numberu64(maximumTokenB).toBuffer(),
        }, data);
        var keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: sourceA, isSigner: false, isWritable: true },
            { pubkey: sourceB, isSigner: false, isWritable: true },
            { pubkey: intoA, isSigner: false, isWritable: true },
            { pubkey: intoB, isSigner: false, isWritable: true },
            { pubkey: poolToken, isSigner: false, isWritable: true },
            { pubkey: poolAccount, isSigner: false, isWritable: true },
            { pubkey: tokenProgramId, isSigner: false, isWritable: false },
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: swapProgramId,
            data: data,
        });
    };
    /**
     * Withdraw tokens from the pool
     *
     * @param userAccountA User account for token A
     * @param userAccountB User account for token B
     * @param poolAccount User account for pool token
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param poolTokenAmount Amount of pool tokens to burn
     * @param minimumTokenA The minimum amount of token A to withdraw
     * @param minimumTokenB The minimum amount of token B to withdraw
     */
    TokenSwap.prototype.withdrawAllTokenTypes = function (userAccountA, userAccountB, poolAccount, userTransferAuthority, poolTokenAmount, minimumTokenA, minimumTokenB) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendAndConfirmTransaction('withdraw', this.connection, new Transaction().add(TokenSwap.withdrawAllTokenTypesInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, this.poolToken, this.feeAccount, poolAccount, this.tokenAccountA, this.tokenAccountB, userAccountA, userAccountB, this.swapProgramId, this.tokenProgramId, poolTokenAmount, minimumTokenA, minimumTokenB)), this.payer, userTransferAuthority)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenSwap.withdrawAllTokenTypesInstruction = function (tokenSwap, authority, userTransferAuthority, poolMint, feeAccount, sourcePoolAccount, fromA, fromB, userAccountA, userAccountB, swapProgramId, tokenProgramId, poolTokenAmount, minimumTokenA, minimumTokenB) {
        var dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('poolTokenAmount'),
            Layout.uint64('minimumTokenA'),
            Layout.uint64('minimumTokenB'),
        ]);
        var data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 3,
            poolTokenAmount: new Numberu64(poolTokenAmount).toBuffer(),
            minimumTokenA: new Numberu64(minimumTokenA).toBuffer(),
            minimumTokenB: new Numberu64(minimumTokenB).toBuffer(),
        }, data);
        var keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
            { pubkey: fromA, isSigner: false, isWritable: true },
            { pubkey: fromB, isSigner: false, isWritable: true },
            { pubkey: userAccountA, isSigner: false, isWritable: true },
            { pubkey: userAccountB, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: true },
            { pubkey: tokenProgramId, isSigner: false, isWritable: false },
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: swapProgramId,
            data: data,
        });
    };
    /**
     * Deposit one side of tokens into the pool
     * @param userAccount User account to deposit token A or B
     * @param poolAccount User account to receive pool tokens
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param sourceTokenAmount The amount of token A or B to deposit
     * @param minimumPoolTokenAmount Minimum amount of pool tokens to mint
     */
    TokenSwap.prototype.depositSingleTokenTypeExactAmountIn = function (userAccount, poolAccount, userTransferAuthority, sourceTokenAmount, minimumPoolTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendAndConfirmTransaction('depositSingleTokenTypeExactAmountIn', this.connection, new Transaction().add(TokenSwap.depositSingleTokenTypeExactAmountInInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, userAccount, this.tokenAccountA, this.tokenAccountB, this.poolToken, poolAccount, this.swapProgramId, this.tokenProgramId, sourceTokenAmount, minimumPoolTokenAmount)), this.payer, userTransferAuthority)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenSwap.depositSingleTokenTypeExactAmountInInstruction = function (tokenSwap, authority, userTransferAuthority, source, intoA, intoB, poolToken, poolAccount, swapProgramId, tokenProgramId, sourceTokenAmount, minimumPoolTokenAmount) {
        var dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('sourceTokenAmount'),
            Layout.uint64('minimumPoolTokenAmount'),
        ]);
        var data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 4,
            sourceTokenAmount: new Numberu64(sourceTokenAmount).toBuffer(),
            minimumPoolTokenAmount: new Numberu64(minimumPoolTokenAmount).toBuffer(),
        }, data);
        var keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: source, isSigner: false, isWritable: true },
            { pubkey: intoA, isSigner: false, isWritable: true },
            { pubkey: intoB, isSigner: false, isWritable: true },
            { pubkey: poolToken, isSigner: false, isWritable: true },
            { pubkey: poolAccount, isSigner: false, isWritable: true },
            { pubkey: tokenProgramId, isSigner: false, isWritable: false },
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: swapProgramId,
            data: data,
        });
    };
    /**
     * Withdraw tokens from the pool
     *
     * @param userAccount User account to receive token A or B
     * @param poolAccount User account to burn pool token
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param destinationTokenAmount The amount of token A or B to withdraw
     * @param maximumPoolTokenAmount Maximum amount of pool tokens to burn
     */
    TokenSwap.prototype.withdrawSingleTokenTypeExactAmountOut = function (userAccount, poolAccount, userTransferAuthority, destinationTokenAmount, maximumPoolTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendAndConfirmTransaction('withdrawSingleTokenTypeExactAmountOut', this.connection, new Transaction().add(TokenSwap.withdrawSingleTokenTypeExactAmountOutInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, this.poolToken, this.feeAccount, poolAccount, this.tokenAccountA, this.tokenAccountB, userAccount, this.swapProgramId, this.tokenProgramId, destinationTokenAmount, maximumPoolTokenAmount)), this.payer, userTransferAuthority)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenSwap.withdrawSingleTokenTypeExactAmountOutInstruction = function (tokenSwap, authority, userTransferAuthority, poolMint, feeAccount, sourcePoolAccount, fromA, fromB, userAccount, swapProgramId, tokenProgramId, destinationTokenAmount, maximumPoolTokenAmount) {
        var dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('destinationTokenAmount'),
            Layout.uint64('maximumPoolTokenAmount'),
        ]);
        var data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 5,
            destinationTokenAmount: new Numberu64(destinationTokenAmount).toBuffer(),
            maximumPoolTokenAmount: new Numberu64(maximumPoolTokenAmount).toBuffer(),
        }, data);
        var keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
            { pubkey: fromA, isSigner: false, isWritable: true },
            { pubkey: fromB, isSigner: false, isWritable: true },
            { pubkey: userAccount, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: true },
            { pubkey: tokenProgramId, isSigner: false, isWritable: false },
        ];
        return new TransactionInstruction({
            keys: keys,
            programId: swapProgramId,
            data: data,
        });
    };
    return TokenSwap;
}());
export { TokenSwap };

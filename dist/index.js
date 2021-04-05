"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBL = void 0;
var discord_js_1 = require("discord.js");
var eris_1 = require("eris");
var axios_1 = require("axios");
var Webhook_1 = require("./Webhook");
var IBL = /** @class */ (function () {
    /**
     * @param client Your eris/discord.js client
     * @param key Your Infinity Bot List API Key
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
    */
    function IBL(client, key) {
        this.base_url = "https://api.infinitybotlist.com";
        this.client_type = this.TestClient(client);
        this.client = client;
        this.key = key;
    }
    ;
    /**
     * Autopost stats at a custom interval, defaults to every 30 minutes. Please provide time in milliseconds, minimum of 5 minutes
     * @param interval The interval (in ms) to post the stats in
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
     * ibl.autopost(15 * 60 * 1000); //AutoPost every 15 minutes
     */
    IBL.prototype.autopost = function (interval) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!interval)
                            interval = 1800000; //30 minutes in milliseconds
                        if (interval > 300000)
                            throw new RangeError("Can only post stats every 5 minutes due to rate limits on the API!");
                        return [4 /*yield*/, this.postStats()];
                    case 1:
                        _a.sent();
                        setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.postStats()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, interval);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
     * ibl.postStats()
     */
    IBL.prototype.postStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post(this.base_url + "/bot/" + this.client.user.id, {
                            //@ts-expect-error - because typescript looks for shared properties and throws an error if it isn't shared
                            servers: this.client_type == "djs" ? this.client.guilds.cache.size : this.client.guilds.size,
                            //@ts-expect-error - same as above
                            shards: this.client_type == "djs" ? this.client.shard.count : this.client.shards.size
                        }, {
                            headers: {
                                Authorization: this.key,
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IBL.prototype.TestClient = function (client) {
        if (client instanceof discord_js_1.Client)
            return "djs";
        else if (client instanceof eris_1.Client)
            return "eris";
        else
            throw new TypeError("Unfortunately this package only supports the discord.js or eris discord libraries.");
    };
    ;
    /**
     * @param auth The authorization to use for the webhook (the one you set on the bot page)
     * @param port The port for the webhook to listen to (default - 3000)
     * @param path The path to use the webhook for (default - /webhook)
     */
    IBL.prototype.voteWebhook = function (auth, port, path) {
        this.webhook = new Webhook_1.default(auth, port || 3000, path || "/webhook");
    };
    return IBL;
}());
exports.IBL = IBL;

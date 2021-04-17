import { Client as DJSClient } from "discord.js";
import { Client as ErisClient } from "eris";
import Webhook from "./Webhook";
export declare class IBL {
    private client;
    private client_type;
    private key;
    private base_url;
    webhook: Webhook;
    /**
     * @param client Your eris/discord.js client
     * @param key Your Infinity Bot List API Key
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
    */
    constructor(client: DJSClient | ErisClient, key: string);
    /**
     * Autopost stats at a custom interval, defaults to every 30 minutes. Please provide time in milliseconds, minimum of 5 minutes
     * @param interval The interval (in ms) to post the stats in
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
     * ibl.autopost(15 * 60 * 1000); //AutoPost every 15 minutes
     */
    autopost(interval?: number): Promise<boolean>;
    /**
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
     * ibl.postStats()
     */
    postStats(): Promise<import("axios").AxiosResponse<any>>;
    private TestClient;
    /**
     * @param auth The authorization to use for the webhook (the one you set on the bot page)
     * @param port The port for the webhook to listen to (default - 3000)
     * @param path The path to use the webhook for (default - /webhook)
     */
    voteWebhook(auth: string, port?: number, path?: string): void;
}

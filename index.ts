import { Client as DJSClient } from "discord.js";
import { Client as ErisClient } from "eris";
import Axios from "axios";
import Webhook from "./Webhook";
type client_type = "eris" | "djs";
export class IBL {
    private client: DJSClient | ErisClient; // Supports eris and djs clients
    private client_type: client_type
    private key: string; // API key provided in the constructor
    private base_url: string = "https://api.infinitybotlist.com";
    webhook: Webhook;
    /**
     * @param client Your eris/discord.js client
     * @param key Your Infinity Bot List API Key
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
    */
    constructor(client: DJSClient | ErisClient, key: string) {
        this.client_type = this.TestClient(client);
        this.client = client;
        this.key = key;
    };
    /**
     * Autopost stats at a custom interval, defaults to every 30 minutes. Please provide time in milliseconds, minimum of 5 minutes
     * @param interval The interval (in ms) to post the stats in
     * @example 
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
     * ibl.autopost(15 * 60 * 1000); //Autopost every 15 minutes
     */
    async autopost(interval?: number): Promise<boolean> {
        if (!interval) interval = 1800000; //30 minutes in milleseconds
        if (interval > 300000) throw new RangeError("Can only post stats every 5 minutes due to rate limits on the API!")
        await this.postStats();
        setInterval(async () => {
            await this.postStats();
        }, interval)
        return true
    }
    /**
     * @example
     * const client = new Discord.Client();
     * const { Infinity } = require("ibl-api");
     * const ibl = new Infinity(client, "Infinity Bot List Token");
     * ibl.postStats()
     */
    async postStats() {
        return await Axios.post(`${this.base_url}/bot/${this.client.user.id}`, {
            //@ts-expect-error - because typescript looks for shared properties and throws an error if it isn't shared
            servers: this.client_type == "djs" ? this.client.guilds.cache.size : this.client.guilds.size,
            //@ts-expect-error - same as above
            shards: this.client_type == "djs" ? this.client.shard.count : this.client.shards.size
        }, {
            headers: {
                Authorization: this.key,
                "Content-Type": "application/json"
            }
        })
    }

    private TestClient(client: any): client_type {
        if (client instanceof DJSClient) return "djs";
        else if (client instanceof ErisClient) return "eris";
        else throw new TypeError("Unfortunately this package only supports the discord.js or eris discord libraries.");
    };
    /**
     * @param auth The authorization to use for the webhook (the one you set on the bot page)
     * @param port The port for the webhook to listen to (default - 3000)
     * @param path The path to use the webhook for (default - /webhook)
     */
    voteWebhook(auth: string, port?: number, path?: string) {
        this.webhook = new Webhook(auth, port || 3000, path || "/webhook");
    }
}
import express from "express";
import { EventEmitter } from "events";
export = class Webhook extends EventEmitter {
    app: express.Application;
    port: number;
    auth: string;
    path: string;
    /**
     * @param auth The key for the Infinity Bot List webhook to use
     * @param port The port for the Infinity Bot List webhook to use
     * @param path The path for the Infinity Bot List webhook to use
     */
    constructor(auth: string, port: number, path: string) {
        super();
        this.port = port;
        this.auth = auth;
        this.path = path;
        this.app = express();
        this.app.use(express.json());
        this.app.post(this.path, (req: express.Request, res: express.Response) => {
            if (req.header('Authorization') != this.auth) return res.status(401).json({ error: 401, message: "Unauthorized" });
            const userID = req.body.userID;
            const botID = req.body.botID;
            const type = req.body.type;
            this.emit('vote', userID, botID, type);
            res.status(200).json({ error: null, message: 'Request successful' })
        });
        this.app.listen(this.port, () => {
            this.emit("ready", this.port)
        })
    }
}
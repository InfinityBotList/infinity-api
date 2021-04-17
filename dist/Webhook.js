"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = require("events");
class Webhook extends events_1.EventEmitter {
    /**
     * @param auth The key for the Infinity Bot List webhook to use
     * @param port The port for the Infinity Bot List webhook to use
     * @param path The path for the Infinity Bot List webhook to use
     */
    constructor(auth, port, path) {
        super();
        this.port = port;
        this.auth = auth;
        this.path = path;
        this.app = express_1.default();
        this.app.use(express_1.default.json());
        this.app.post(this.path, (req, res) => {
            if (req.header('Authorization') != this.auth)
                return res.status(401).json({ error: 401, message: "Unauthorized" });
            const userID = req.body.userID;
            const botID = req.body.botID;
            const type = req.body.type;
            this.emit('vote', userID, botID, type);
            res.status(200).json({ error: null, message: 'Request successful' });
        });
        this.app.listen(this.port, () => {
            this.emit("ready", this.port);
        });
    }
}
exports.default = Webhook;

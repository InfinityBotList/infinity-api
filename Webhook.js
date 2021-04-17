"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var events_1 = require("events");
var Webhook = /** @class */ (function (_super) {
    __extends(Webhook, _super);
    /**
     * @param auth The key for the Infinity Bot List webhook to use
     * @param port The port for the Infinity Bot List webhook to use
     * @param path The path for the Infinity Bot List webhook to use
     */
    function Webhook(auth, port, path) {
        var _this = _super.call(this) || this;
        _this.port = port;
        _this.auth = auth;
        _this.path = path;
        _this.app = express_1.default();
        _this.app.use(express_1.default.json());
        _this.app.post(_this.path, function (req, res) {
            if (req.header('Authorization') != _this.auth)
                return res.status(401).json({ error: 401, message: "Unauthorized" });
            var userID = req.body.userID;
            var botID = req.body.botID;
            var type = req.body.type;
            _this.emit('vote', userID, botID, type);
            res.status(200).json({ error: null, message: 'Request successful' });
        });
        _this.app.listen(_this.port, function () {
            _this.emit("ready", _this.port);
        });
        return _this;
    }
    return Webhook;
}(events_1.EventEmitter));
exports.default = Webhook;
//# sourceMappingURL=Webhook.js.map
/// <reference types="node" />
import express from "express";
import { EventEmitter } from "events";
export default class Webhook extends EventEmitter {
    app: express.Application;
    port: number;
    auth: string;
    path: string;
    /**
     * @param auth The key for the Infinity Bot List webhook to use
     * @param port The port for the Infinity Bot List webhook to use
     * @param path The path for the Infinity Bot List webhook to use
     */
    constructor(auth: string, port: number, path: string);
}

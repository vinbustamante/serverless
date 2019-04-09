"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const serverless = require("aws-serverless-express");
const express = require("express");
let cachedServer;
function bootstrapServer() {
    const expressApp = express();
    const adapter = new platform_express_1.ExpressAdapter(expressApp);
    return core_1.NestFactory.create(app_module_1.AppModule, adapter)
        .then(app => app.enableCors())
        .then(app => app.init())
        .then(() => serverless.createServer(expressApp));
}
exports.handler = (event, context) => {
    if (!cachedServer) {
        bootstrapServer().then(server => {
            cachedServer = server;
            return serverless.proxy(server, event, context);
        });
    }
    else {
        return serverless.proxy(cachedServer, event, context);
    }
};
//# sourceMappingURL=lambda.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app/app"));
const PORT = process.env.PORT;
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
//# sourceMappingURL=server.js.map
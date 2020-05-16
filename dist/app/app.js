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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = express_1.default();
app.use(express_1.default.static('public'));
app.get('/states', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield axios_1.default.get(process.env.URI + '/data.json');
        const data = result.data.map((state) => {
            return { id: state.id, name: state.name };
        });
        return res.json({ success: 1, data: data });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: 0, message: 'Something went wrong' });
    }
}));
app.get('/state/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = +req.params.id - 1;
    try {
        const result = yield axios_1.default.get(process.env.URI + '/data.json');
        const data = result.data[id];
        return res.json({ success: 1, data: data });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: 0, message: 'Something went wrong' });
    }
}));
app.get('/docs', (req, res) => {
    res.send('document is here');
});
app.all('*', (req, res) => {
    res.redirect('/docs');
});
exports.default = app;
//# sourceMappingURL=app.js.map
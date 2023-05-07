"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleWare = (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: 'Unauthorized' });
        const user = jsonwebtoken_1.default.verify(token, 'secret');
        req.user = user;
        next();
    }
    catch (e) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};
exports.authMiddleWare = authMiddleWare;

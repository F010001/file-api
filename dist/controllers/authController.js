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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const authService_1 = require("../services/authService");
class UserController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new Error('Wrong body');
                }
                const token = yield authService_1.authService.signUp(email, password);
                res.cookie('refreshToken', token.refreshToken, {
                    httpOnly: true,
                    secure: true,
                });
                res.send({ accessToken: token.accessToken });
            }
            catch (error) {
                res.send({ message: 'Wrong login or password' });
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new Error('Wrong body');
                }
                const token = yield authService_1.authService.signIn(email, password);
                res.cookie('refreshToken', token.refreshToken, {
                    httpOnly: true,
                    secure: true,
                });
                res.send({ accessToken: token.accessToken });
            }
            catch (error) {
                res.send({ message: 'Wrong login or password' });
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    throw new Error('Wrong token');
                }
                const token = yield authService_1.authService.refreshToken(refreshToken);
                res.cookie('refreshToken', token.refreshToken, {
                    httpOnly: true,
                    secure: true,
                });
                res.send(token.accessToken);
            }
            catch (error) {
                res.send({ message: 'Inccorect token' });
            }
        });
    }
    info(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const email = yield authService_1.authService.info(id);
                res.send(email);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('refreshToken', { secure: true, httpOnly: true });
                res.send('You are logout');
            }
            catch (error) {
                res.send(error);
            }
        });
    }
}
exports.userController = new UserController();

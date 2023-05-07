"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authService = exports.AuthService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
class AuthService {
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldUser = yield user_repository_1.userRepository.findUserByEmail(email);
            if (oldUser) {
                throw new Error('Usser is already is exist');
            }
            const salt = yield bcrypt.genSalt(10);
            const passwordHash = yield bcrypt.hash(password, salt);
            const newUser = yield user_repository_1.userRepository.creaUser({
                id: (0, uuid_1.v4)(),
                email: email,
                password: passwordHash,
            });
            return this.generateToken(newUser.dataValues.id);
        });
    }
    signIn(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const equalPassword = yield bcrypt.compare(password, user.dataValues.password);
            if (!equalPassword) {
                throw new Error('Wrong password');
            }
            return this.generateToken(user.dataValues.id);
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = jsonwebtoken_1.default.verify(refreshToken, 'secret');
            if (!user) {
                throw new Error('Token not valid');
            }
            return this.generateToken(user.id);
        });
    }
    info(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.userRepository.findUserById(id);
            if (!user) {
                throw new Error('Token not valid');
            }
            return user.dataValues.email;
        });
    }
    generateToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { id };
            return {
                accessToken: jsonwebtoken_1.default.sign(payload, 'secret', {
                    expiresIn: '10m',
                }),
                refreshToken: jsonwebtoken_1.default.sign(payload, 'secret', {
                    expiresIn: '24h',
                }),
            };
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();

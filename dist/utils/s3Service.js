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
exports.s3Delete = exports.s3Upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3Upload = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const params = {
            Bucket: 'testbucket-for-nodejs',
            Key: file.originalname,
            Body: file.buffer,
        };
        return s3.upload(params).promise();
    }
});
exports.s3Upload = s3Upload;
const s3Delete = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: 'testbucket-for-nodejs',
        Key: name,
    };
    const media = yield s3.getObject(params).promise();
    if (media) {
        return s3.deleteObject(params).promise();
    }
});
exports.s3Delete = s3Delete;

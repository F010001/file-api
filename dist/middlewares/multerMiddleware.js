"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleware = exports.fileFilter = exports.fileStorage = void 0;
const multer_1 = __importDefault(require("multer"));
exports.fileStorage = multer_1.default.memoryStorage();
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
exports.multerMiddleware = (0, multer_1.default)({
    storage: exports.fileStorage,
    fileFilter: exports.fileFilter,
});

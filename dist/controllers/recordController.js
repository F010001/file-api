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
exports.recordController = void 0;
const recordService_1 = require("../services/recordService");
class RecordController {
    createRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filedata = req.file;
                const { id } = req.user;
                if (filedata) {
                    const newRecord = yield recordService_1.recordService.createRecord(id, '', req.file);
                    res.status(200).send(newRecord);
                }
                else {
                    const { message } = req.body;
                    const newRecord = yield recordService_1.recordService.createRecord(id, message);
                    res.status(200).send(newRecord);
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Server error' });
            }
        });
    }
    getListRecords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return recordService_1.recordService.getRecordsList(req.params.id);
            }
            catch (error) {
                res.status(500).send({ message: 'Server error' });
            }
        });
    }
    deleteRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield recordService_1.recordService.deleteRecord(req.params.id);
                res.status(200).end();
            }
            catch (error) {
                res.status(500).send({ message: 'Server error' });
            }
        });
    }
    updateRecord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filedata = req.file;
                if (filedata) {
                    const newRecord = yield recordService_1.recordService.updateRecord(req.params.id, '', req.file);
                    res.status(200).send(newRecord);
                }
                else {
                    const { message } = req.body;
                    const newRecord = yield recordService_1.recordService.updateRecord(req.params.id, message);
                    res.status(200).send(newRecord);
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Server error' });
            }
        });
    }
}
exports.recordController = new RecordController();

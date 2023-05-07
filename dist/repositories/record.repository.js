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
exports.recordRepository = void 0;
const record_model_1 = require("../models/record.model");
exports.recordRepository = {
    createRecord(newRecord) {
        return __awaiter(this, void 0, void 0, function* () {
            return record_model_1.RecordModel.create(newRecord);
        });
    },
    findRecordById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return record_model_1.RecordModel.findByPk(id);
        });
    },
    getAllRecords(list) {
        return __awaiter(this, void 0, void 0, function* () {
            if (list <= 1) {
                return record_model_1.RecordModel.findAll({ limit: 20 });
            }
            else {
                return record_model_1.RecordModel.findAll({ limit: 20, offset: list * 10 });
            }
        });
    },
    deleteRecord(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return record_model_1.RecordModel.destroy({ where: { id } });
        });
    },
    updateRecord(id, newMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.findRecordById(id);
            record === null || record === void 0 ? void 0 : record.set({ message: newMessage });
            record === null || record === void 0 ? void 0 : record.save();
            return record;
        });
    },
};

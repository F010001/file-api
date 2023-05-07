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
exports.recordService = exports.RecordService = void 0;
const record_repository_1 = require("../repositories/record.repository");
const uuid_1 = require("uuid");
const s3Service_1 = require("../utils/s3Service");
class RecordService {
    createRecord(userId, message, media) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message) {
                const newRecord = record_repository_1.recordRepository.createRecord({
                    id: (0, uuid_1.v4)(),
                    message: message,
                    authorId: userId,
                });
                return newRecord;
            }
            else if (message === '' && media) {
                const s3Media = yield (0, s3Service_1.s3Upload)(media);
                if (s3Media) {
                    const newRecord = record_repository_1.recordRepository.createRecord({
                        id: (0, uuid_1.v4)(),
                        message: s3Media.Location,
                        authorId: userId,
                    });
                    return newRecord;
                }
            }
        });
    }
    deleteRecord(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield record_repository_1.recordRepository.findRecordById(id);
            if (record) {
                const key = record.dataValues.message.slice(47);
                yield (0, s3Service_1.s3Delete)(key);
                yield record_repository_1.recordRepository.deleteRecord(record.dataValues.id);
            }
        });
    }
    getRecordsList(list_size) {
        return __awaiter(this, void 0, void 0, function* () {
            return record_repository_1.recordRepository.getAllRecords(+list_size);
        });
    }
    updateRecord(id, message, media) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message === '' && media) {
                const record = yield record_repository_1.recordRepository.findRecordById(id);
                if (record) {
                    const key = record.dataValues.message.slice(47);
                    yield (0, s3Service_1.s3Delete)(key);
                }
                const s3Media = yield (0, s3Service_1.s3Upload)(media);
                if (s3Media) {
                    const updateRecord = yield record_repository_1.recordRepository.updateRecord(id, s3Media.Location);
                    return updateRecord;
                }
            }
            else if (message) {
                const record = yield record_repository_1.recordRepository.findRecordById(id);
                if (record) {
                    const updateRecord = yield record_repository_1.recordRepository.updateRecord(id, message);
                    return updateRecord;
                }
            }
        });
    }
}
exports.RecordService = RecordService;
exports.recordService = new RecordService();

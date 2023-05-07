import { recordRepository } from '../repositories/record.repository';
import { v4 as uuidv4 } from 'uuid';
import { s3Delete, s3Upload } from '../utils/s3Service';

export class RecordService {
  async createRecord(
    userId: string,
    message?: string,
    media?: Express.Multer.File
  ) {
    if (message) {
      const newRecord = recordRepository.createRecord({
        id: uuidv4(),
        message: message,
        authorId: userId,
      });

      return newRecord;
    } else if (message === '' && media) {
      const s3Media = await s3Upload(media);
      if (s3Media) {
        const newRecord = recordRepository.createRecord({
          id: uuidv4(),
          message: s3Media.Location,
          authorId: userId,
        });

        return newRecord;
      }
    }
  }

  async deleteRecord(id: string) {
    const record = await recordRepository.findRecordById(id);
    if (record) {
      const key = record.dataValues.message.slice(47);
      await s3Delete(key);
      await recordRepository.deleteRecord(record.dataValues.id);
    }
  }

  async getRecordsList(list_size: string) {
    return recordRepository.getAllRecords(+list_size);
  }

  async updateRecord(
    id: string,
    message?: string,
    media?: Express.Multer.File
  ) {
    if (message === '' && media) {
      const record = await recordRepository.findRecordById(id);
      if (record) {
        const key = record.dataValues.message.slice(47);
        await s3Delete(key);
      }
      const s3Media = await s3Upload(media);
      if (s3Media) {
        const updateRecord = await recordRepository.updateRecord(
          id,
          s3Media.Location
        );
        return updateRecord;
      }
    } else if (message) {
      const record = await recordRepository.findRecordById(id);
      if (record) {
        const updateRecord = await recordRepository.updateRecord(id, message);
        return updateRecord;
      }
    }
  }
}

export const recordService = new RecordService();

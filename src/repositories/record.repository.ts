import { RecordModel } from '../models/record.model';
import { RecordType } from '../types/models.types';

export const recordRepository = {
  async createRecord(newRecord: RecordType) {
    return RecordModel.create(newRecord);
  },

  async findRecordById(id: string) {
    return RecordModel.findByPk(id);
  },

  async getAllRecords(list: number) {
    if (list <= 1) {
      return RecordModel.findAll({ limit: 20 });
    } else {
      return RecordModel.findAll({ limit: 20, offset: list * 10 });
    }
  },

  async deleteRecord(id: string) {
    return RecordModel.destroy({ where: { id } });
  },

  async updateRecord(id: string, newMessage: string) {
    const record = await this.findRecordById(id);
    record?.set({ message: newMessage });
    record?.save();
    return record;
  },
};

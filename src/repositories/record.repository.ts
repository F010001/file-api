import { Record } from '../models/models';
import { RecordType } from '../types/models.types';

export const recordRepository = {
  async createRecord(newRecord: RecordType) {
    return Record.create(newRecord);
  },

  async findRecordById(id: string) {
    return Record.findByPk(id);
  },

  async getAllRecords(list: number) {
    if (list <= 1) {
      return Record.findAll({ limit: 20 });
    } else {
      return Record.findAll({ limit: 20, offset: list * 10 });
    }
  },

  async deleteRecord(id: string) {
    return Record.destroy({ where: { id } });
  },

  async updateRecord(id: string, newMessage: string) {
    const record = await this.findRecordById(id);
    record?.set({ message: newMessage });
    record?.save();
    return record;
  },
};

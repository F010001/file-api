import { NextFunction, Request, Response } from 'express';
import { recordService } from '../services/recordService';

class RecordController {
  async createRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const filedata = req.file;
      const { id } = req.user;
      if (filedata) {
        const newRecord = await recordService.createRecord(id, '', req.file);
        res.status(200).send(newRecord);
      } else {
        const { message } = req.body;
        const newRecord = await recordService.createRecord(id, message);
        res.status(200).send(newRecord);
      }
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  }

  async getListRecords(req: Request, res: Response, next: NextFunction) {
    try {
      return recordService.getRecordsList(req.params.size);
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  }

  async deleteRecord(req: Request, res: Response, next: NextFunction) {
    try {
      await recordService.deleteRecord(req.params.id);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  }

  async updateRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const filedata = req.file;
      if (filedata) {
        const newRecord = await recordService.updateRecord(
          req.params.id,
          '',
          req.file
        );
        res.status(200).send(newRecord);
      } else {
        const { message } = req.body;
        const newRecord = await recordService.updateRecord(
          req.params.id,
          message
        );
        res.status(200).send(newRecord);
      }
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  }
}

export const recordController = new RecordController();

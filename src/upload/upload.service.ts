import { Injectable } from '@nestjs/common';
import { UploadDocument } from './schemas/upload.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel('Upload')
    private readonly uploadModel: Model<UploadDocument>
  ){}
  async uploadFile(createUploadDto) {
    const newFile = new this.uploadModel(createUploadDto);
    return newFile.save();
  }

  async findAll() {
    return await this.uploadModel.find().exec();
  }
}

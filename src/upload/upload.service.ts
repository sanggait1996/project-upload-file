import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './enitites/upload.entity';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ){}
  async uploadFile(file: Express.Multer.File, createUploadDto: CreateUploadDto) {
    createUploadDto.path = file.path;
    const newFile = this.uploadRepository.create(createUploadDto);
    return this.uploadRepository.save(newFile);
  }

  async findAll() {
    return await this.uploadRepository.find();
  }
}

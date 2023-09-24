import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUploadDto } from './dto/create-upload.dto';
import { Upload } from './enitites/upload.entity';
import { Express } from 'express';

@ApiTags('Upload File')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        filename: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req: Request, file, cb) => {
        const maxSizeInBytes = 1048576; // 1MB
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException(
              'Invalid file format. Only JPG and PNG files are allowed.',
            ),
            false,
          );
        }

        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > maxSizeInBytes) {
          return cb(
            new BadRequestException(
              'File size exceeds the maximum allowed size of 1MB.',
            ),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createUploadDto: CreateUploadDto): Promise<Upload> {
    return await this.uploadService.uploadFile(file ,createUploadDto);
  }


  @Get()
  async getAllFiles() {
    return await this.uploadService.findAll();
  }
}

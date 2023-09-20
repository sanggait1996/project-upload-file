import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Upload File')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileName: {
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
          console.log(req.body.fileName);
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
  }
}

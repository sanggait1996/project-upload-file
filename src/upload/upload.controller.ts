import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

@Post('upload')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`)
    }
  })
}))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  return 'success'
}

}

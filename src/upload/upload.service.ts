import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  uploadFile(file) {
    return 'Upload file successful.'
  }
}

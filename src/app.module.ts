import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    UploadModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/test'), //mongodb://mongodb:27017/test
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

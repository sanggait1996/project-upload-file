import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    UploadModule, 
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // migrationsTableName: 'test',
      // migrations: ["migration/*.js"], 
      // cli: { 
      //   migrationsDir: 'migration'
      //},
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
// import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm'
// import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '72h' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    AuthService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // UserService,
    // Repository<User>,
    
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
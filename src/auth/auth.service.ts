import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      throw new NotFoundException(`Cannot found user with email ${email}`);
    }

    const verifyPassword = await argon2.verify(user.password, pass);

    if(!verifyPassword) {
      throw new UnauthorizedException("Wrong user or password!");
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload)
    const updatedUser = {...user, access_token: access_token}
    this.userRepository.update(user.id, updatedUser);
    return {
      access_token: access_token,
    };
  }
}
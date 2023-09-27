import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const user = this.userRepository.create(createUserDto);
    const encryptedPassword = await this.hashPassword(user.password)
    const newUser = {...user, password: encryptedPassword}
    return this.userRepository.save(newUser);
  }

  async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      id: id
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      email: email
    })
  } 

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      return `cannot found user with id = ${id}`;
    }
    const userUpdate = { ...user, ...updateUserDto };
    return this.userRepository.update(id, userUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

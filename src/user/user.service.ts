import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
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
    console.log(user);
    console.log(updateUserDto);
    console.log(userUpdate);
    return this.userRepository.update(id, userUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

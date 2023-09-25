import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'Email is incorrect format.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;

  @IsNotEmpty({ message: 'Age cannot be empty.' })
  age: number;

  @IsNotEmpty({ message: 'Gender cannot be empty.' })
  gender: number;

  @IsNotEmpty({ message: 'Address cannot be empty.' })
  address: string;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'Email is incorrect format.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;

  @IsNotEmpty({ message: 'Age cannot be empty.' })
  age: number;

  @IsNotEmpty({ message: 'Gender cannot be empty.' })
  gender: number;

  @IsNotEmpty({ message: 'Address cannot be empty.' })
  address: string;
}

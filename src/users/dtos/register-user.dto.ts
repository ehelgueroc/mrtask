import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/publicroute.decorator';
import { RegisterUserDto, SignInUserDto } from '../users/dtos';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.registerUser(registerUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}

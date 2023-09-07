import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../users/dtos';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(user: RegisterUserDto) {
    try {
      const userExists = await this.usersService.findOne(user.email);
      if (userExists) {
        throw new ConflictException('Username already exists');
      }
      // generate hash DOING TOO MUCH? Should be in another place?
      // should change the generateHashPassword to generateHash only
      const hashPassword = this.generateHash(user.password);
      return await this.usersService.create({
        ...user,
        password: hashPassword,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== this.generateHash(pass)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  // there is an issue in this place where cant generate the code again
  private generateHash(password: string): string {
    const hash = createHmac('sha256', process.env.PASSWORD_SECRET_KEY);
    const update = hash.update(password);
    const digest = update.digest('hex');
    return digest;
  }
}

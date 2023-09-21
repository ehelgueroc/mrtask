import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/publicroute.decorator';

// created with nest g gu auth
@Injectable()
export class AuthGuard implements CanActivate {
  // inject jwt and reflector
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check if the metadata of the endpoint is set to public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // if metadata isPublic is set to true we do not need to check anything
    if (isPublic) {
      return true;
    }
    // get the request data
    const request = context.switchToHttp().getRequest();
    // get the token from the header auth
    const token = this.extractTokenFromHeader(request);
    // throw an error if there is no token
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // get the payload of a JWT if it is valid
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // add payload to the user
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

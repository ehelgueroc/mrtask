import { Request } from 'express';

export interface User {
  sub: string;
  email: string;
}
export interface RequestWithUser extends Request {
  user: User;
}

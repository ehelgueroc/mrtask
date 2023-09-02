import { Injectable } from '@nestjs/common';

export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'Steve',
      email: 'steve@mre.io',
      password: 'changeme',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 2,
      username: 'Mrieo',
      email: 'mreio@mre.io',
      password: '1234',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}

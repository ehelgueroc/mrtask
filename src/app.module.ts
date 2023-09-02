import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// imports modules of users and authorization
// to have them available for other modules
@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users/users.module';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersService } from './users/services/users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}

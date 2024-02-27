import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UserProfile } from './typeorm/entities/UserProfile';
import { UserCredentials } from './typeorm/entities/UserCredentials';

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
} = process.env;

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT),
    host: DB_HOST,
    entities: [User, UserProfile, UserCredentials],
    synchronize: true,
  }), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

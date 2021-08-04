import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database.module";
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), DatabaseModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

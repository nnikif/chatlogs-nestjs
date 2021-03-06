import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { AuthenticationController } from './authentication.controller';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  imports: [UsersModule, PassportModule, ConfigModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get("JWT_SECRET"),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`
      }
    })
  })],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}

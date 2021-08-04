import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response} from "express";
import { AuthenticationService } from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import UserDto from "../users/dto/user.dto";
import { LocalAuthenticationGuard } from "./local-authentication.guard";
import RequestWithUser from "./request-with-user.interface";
import JwtAuthenticationGuard from "./jwt-authentication.guard";

@Controller('auth')
@Serialize(UserDto)
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {
    }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Req() request: RequestWithUser, @Res() response: Response) {
        const {user} = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(request.user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logOut(@Res() response: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        return request.user;
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Repository } from "typeorm";
import CreateUserDto from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async getByEmail(email: string) {
        const user = await this.usersRepository.findOne( { email });
        if (user) return user;
        throw new HttpException("User with this email doesn't exist", HttpStatus.NOT_FOUND);
    }

    async getById(id: string) {
        const user = await this.usersRepository.findOne({id});
        if (user) return user;
        throw new HttpException("User with this id doesn't exists", HttpStatus.NOT_FOUND)
    }

    async create(userData: CreateUserDto) {
        const newUser = await this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }
}

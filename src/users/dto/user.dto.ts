import { Expose } from "class-transformer";

export default class UserDto {
    @Expose()
    id: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;

    @Expose()
    email: string;

    @Expose()
    name: string;

}
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RMQService, USER_CMD } from "src/constants";
import { createUserDto } from "./dto/create-users.dto";
import { Observable } from "rxjs";
import { ChangePasswordEntyty } from "./entities/change-password.entity";
import { updateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)
    @Inject(RMQService.USERS) private readonly usersServiceQmq: ClientProxy

    async registerUser(body: createUserDto): Promise<Observable<any>> {
        return this.usersServiceQmq.emit(
            {
                cmd: USER_CMD,
                method: 'register',
            },
            body,
        )
    }

    changePasswordUser(userId: string, hashPassword: string): Observable<ChangePasswordEntyty> {
        return this.usersServiceQmq.emit(
            {
                cmd: USER_CMD,
                method: 'changePassword',
            },
            {
                userId,
                hashPassword
            }
        )
    }

    updateUser(userId: string, update: updateUserDto): Observable<any> {
        return this.usersServiceQmq.emit(
            {
                cmd: USER_CMD,
                method: 'updateUser',
            },
            {
                userId,
                update
            }
        )
    }
}
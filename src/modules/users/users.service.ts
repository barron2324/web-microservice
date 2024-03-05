import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RMQService, USER_CMD } from "src/constants";
import { CreateUserInterface } from "./interfaces/create-user.interfaces";
import { createUserDto } from "./dto/create-users.dto";
import { catchError, firstValueFrom, lastValueFrom, map } from "rxjs";

@Injectable()
export class UsersService {
    constructor(
        @Inject(RMQService.USERS) private readonly usersServiceQmq: ClientProxy,
    ) {

    }

    async registerUser(payload: CreateUserInterface): Promise<createUserDto> {
        return firstValueFrom(
            this.usersServiceQmq.emit(
                {
                    cmd: USER_CMD,
                    method: 'register',
                },
                payload,
            )
        )
    }

    async ping(): Promise<unknown> {
        try {
            const response = await this.usersServiceQmq.send(
                { 
                    cmd: USER_CMD, 
                    method: 'ping' 
                }, 
                {}
                ).toPromise();
            return response;
        } catch (error) {
            throw error;
        }
    }
}
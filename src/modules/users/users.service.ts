import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RMQService, USER_CMD } from "src/constants";
import { CreateUserInterface } from "./interfaces/create-user.interfaces";
import { createUserDto } from "./dto/create-users.dto";
import { Observable, catchError, firstValueFrom, lastValueFrom, map, throwError } from "rxjs";

@Injectable()
export class UsersService {
    constructor(
        @Inject(RMQService.USERS) private readonly usersServiceQmq: ClientProxy,
    ) {

    }

    async registerUser(body: createUserDto): Promise<Observable<any>> {
        return this.usersServiceQmq.emit(
            {
                cmd: USER_CMD,
                method: 'register',
            },
            body,
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
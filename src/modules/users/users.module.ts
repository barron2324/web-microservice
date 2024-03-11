import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controllor";
import { AuthService } from "../auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../auth/guards/jwt.strategy";
import { RMQService } from "src/constants";


@Module({
    imports: [
        PassportModule,
        ClientsModule.register([
            {
                name: RMQService.USERS,
                transport: Transport.RMQ,
                options: {
                    urls: [
                        'amqps://daqcshnj:1HWgbSh6zkDW-EUEoGZ_v52YHC1Dm3L9@armadillo.rmq.cloudamqp.com/daqcshnj'
                    ],
                    noAck: true,
                }
            }
        ])
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService,
        JwtStrategy
    ],
    exports: [
        UsersService,
        AuthService,
        JwtStrategy
    ]
})
export class UsersModule { }
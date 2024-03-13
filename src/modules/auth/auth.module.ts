import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { CacheModule } from "@nestjs/cache-manager";
import { JwtStrategy } from "./guards/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ENV_RMQ, RMQService } from "src/constants";

@Module({
    imports: [
        JwtModule,
        PassportModule,
        CacheModule.register(),
        ClientsModule.register([
            {
                name: RMQService.USERS,
                transport: Transport.RMQ,
                options: {
                    urls: [ENV_RMQ],
                    noAck: true,
                    queue: RMQService.USERS,
                    queueOptions: {
                        durable: false
                    },
                }
            }
        ])
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        AuthService,
        JwtStrategy
    ]
})
export class AuthModule { }
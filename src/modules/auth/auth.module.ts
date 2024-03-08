import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { CacheModule } from "@nestjs/cache-manager";
import { JwtStrategy } from "./guards/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule,
        PassportModule,
        CacheModule.register(),
        ClientsModule.register([
            {
                name: 'user-service',
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
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy]
})
export class AuthModule { }
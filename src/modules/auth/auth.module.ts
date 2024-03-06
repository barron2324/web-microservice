import { DynamicModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { CacheModule } from "@nestjs/cache-manager";

export class AuthModule {
    static register(): DynamicModule {
        return {
            module: AuthModule,
            imports: [
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
            providers: [AuthService]
        }
    }
}
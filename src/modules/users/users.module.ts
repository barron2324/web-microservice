import { DynamicModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controllor";

export class UsersModule {
    static register(): DynamicModule {
        return {
            module: UsersModule,
            imports: [
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
            controllers: [UsersController],
            providers: [UsersService]
        }
    }
}
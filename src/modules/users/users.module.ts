import { DynamicModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controllor";
import { AuthService } from "../auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";

export class UsersModule {
    static register(): DynamicModule {
        return {
            module: UsersModule,
            imports: [
                // PassportModule.register({
                //     defaultStrategy: 'jwt-user'
                // }),
                
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
            providers: [UsersService, JwtStrategy, AuthService]
        }
    }
}
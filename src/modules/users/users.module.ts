import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controllor";
import { AuthService } from "../auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../auth/guards/jwt.strategy";
import { ENV_RMQ, RMQService } from "src/constants";
import { BooksService } from "../books/books.service";
import { OrdersService } from "../orders/orders.service";
import { BooksStockService } from "../books-stock/books-stock.service";


@Module({
    imports: [
        PassportModule,
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
            },
            {
                name: RMQService.BOOKS,
                transport: Transport.RMQ,
                options: {
                    urls: [ENV_RMQ],
                    noAck: true,
                    queue: RMQService.BOOKS,
                    queueOptions: {
                        durable: false
                    },
                }
            },
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
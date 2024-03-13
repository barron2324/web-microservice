import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";
import { ENV_RMQ, RMQService } from "src/constants";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { BooksStockService } from "../books-stock/books-stock.service";
import { BooksService } from "../books/books.service";
import { CacheModule } from "@nestjs/cache-manager";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule,
        PassportModule,
        CacheModule.register(),
        ClientsModule.register([
            {
                name: RMQService.BOOKS,
                transport: Transport.RMQ,
                options: {
                    urls: [ENV_RMQ],
                    noAck: true,
                    queue: RMQService.BOOKS,
                    queueOptions: {
                        durable: true
                    },
                }
            },
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
        ])
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        BooksStockService,
        BooksService,
    ],
})
export class OrdersModule { }
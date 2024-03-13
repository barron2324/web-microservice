import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";
import { ENV_RMQ, RMQService } from "src/constants";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";

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
        ])
    ],
    controllers: [BooksController],
    providers: [BooksService],
    exports: [BooksService]
})
export class BooksModule { }
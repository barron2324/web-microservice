import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "src/config/configuration";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { throttlerAsyncOptions, throttlerServiceProvider } from "src/throttler.providers";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        ThrottlerModule.forRootAsync(throttlerAsyncOptions),
        AuthModule.register(),
        UsersModule.register(),
    ],
    providers: [throttlerServiceProvider],
})

export class AppModule { }
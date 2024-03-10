import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "src/config/configuration";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { throttlerAsyncOptions, throttlerServiceProvider } from "src/throttler.providers";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { JwtRoleGuard } from "../auth/guards/jwt-role.guard";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        ThrottlerModule.forRootAsync(throttlerAsyncOptions),
        AuthModule,
        UsersModule.register(),
    ],
    providers: [
        throttlerServiceProvider,
        {
            provide: APP_GUARD,
            useClass: JwtRoleGuard,
        },
    ],
})

export class AppModule { }
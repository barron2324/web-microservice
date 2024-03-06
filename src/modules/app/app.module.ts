import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "src/config/configuration";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        AuthModule.register(),
        UsersModule.register(),
    ],
})

export class AppModule { }
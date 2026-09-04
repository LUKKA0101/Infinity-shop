import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostgresConfig } from "./config/postgres.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/app.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig],
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}

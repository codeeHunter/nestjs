import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { RoleController } from "./role/role.controller";
import { RoleModule } from "./role/role.module";
import { Role } from "./role/role.model";
import { UserRoles } from "./role/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { TextBlockModule } from "./text-block/text-block.module";
import { ProfileModule } from "./profile/profile.module";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  controllers: [RoleController],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RoleModule,
    AuthModule,
    TextBlockModule,
    ProfileModule,
    FilesModule,
  ],
})
export class AppModule {}

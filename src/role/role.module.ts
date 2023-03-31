import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { RoleController } from "./role.controller";
import { Role } from "./role.model";
import { RoleService } from "./role.service";
import { UserRoles } from "./user-roles.model";

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RoleService],
})
export class RoleModule {}

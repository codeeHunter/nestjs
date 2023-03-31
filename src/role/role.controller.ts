import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}

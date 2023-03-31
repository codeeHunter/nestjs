import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuards } from "src/auth/roles.guard";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  @Roles("admin")
  @UseGuards(RolesGuards, JwtAuthGuard)
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Post("/role")
  @Roles("admin")
  @UseGuards(RolesGuards, JwtAuthGuard)
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}

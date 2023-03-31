import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("profile")
export class ProfileController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}

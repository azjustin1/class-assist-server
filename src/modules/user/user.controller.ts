import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Public } from '../auth/jwt-auth.guard';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('rest/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  signUp(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateUser(@Body() userDTO: UserDTO) {
    return this.userService.update(userDTO);
  }
}

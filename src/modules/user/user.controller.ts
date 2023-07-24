import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Public } from '../auth/auth.guard';

@Controller('rest/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserProfile() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }
}

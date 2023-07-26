import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Public } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('rest/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  signUp(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserProfile() {
    return this.userService.findAll();
  }
}

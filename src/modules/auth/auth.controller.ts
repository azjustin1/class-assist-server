import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { Public } from './auth.guard';

@Controller('rest/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() userDTO: UserDTO) {
    return this.authService.signIn(userDTO.username, userDTO.password);
  }
}

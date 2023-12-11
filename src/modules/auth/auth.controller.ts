import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async signIn(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const user = request.user;
    const accessToken = await this.authService.generateAccessToken(user.id);
    const refreshToken = this.authService.generateRefreshToken(user.id);
    this.authService.saveRefreshToken(user.id, refreshToken);
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });
    response.send({ accessToken: accessToken });
  }

  @Get('refreshToken')
  async refreshToken(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies['JWT-SESSION']) {
      const refreshToken = request.cookies['JWT-SESSION'];
      this.authService.validateRefreshToken(request.user, refreshToken);
    }
  }
}

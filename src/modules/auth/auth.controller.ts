import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../user/entity/user.entity';
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    response.status(200);
  }

  @Public()
  @Get('refreshToken')
  async refreshToken(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies['refreshToken']) {
      const refreshToken = request.cookies['refreshToken'];
      const accessToken =
        await this.authService.generateAccessTokenFromRefreshToken(refreshToken);
      if (accessToken === null) {
        response.status(401);
      }

      response.cookie('accessToken', accessToken, {
        httpOnly: true,
      });
    }
  }
}

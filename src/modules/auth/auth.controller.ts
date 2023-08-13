import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { isNull } from 'lodash';
@Controller('rest/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async signIn(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const token = await this.authService.signIn(request.user);
    if (token && !isNull(token)) {
      response.cookie('access_token', token, {
        httpOnly: true,
      });
      response.status(200);
    } else {
      response.status(403);
    }
  }
}

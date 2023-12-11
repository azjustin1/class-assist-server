import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isNull } from 'lodash';
import { UserDTO } from '../user/dto/user.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { CustomException } from 'src/shared/exceptions/CustomException';

export interface AccessTokenPayload {
  sub: number;
  user: User;
}

export interface RefreshTokenPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDTO: UserDTO) {
    this.usersService.create(userDTO);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (isNull(user)) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }

  async signIn(user: User): Promise<Object | string | null> {
    if (user === null) {
      return null;
    }

    const access_token = this.generateAccessToken(user.id);
    return access_token;
  }

  public async generateAccessToken(userId: number) {
    const user = await this.usersService.findOneById(userId);
    const payload: AccessTokenPayload = { sub: user.id, user: user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('auth.secret'),
      expiresIn: this.configService.get<string>('auth.accessTokenExpire'),
    });
  }

  public generateRefreshToken(userId: number): string {
    const payload: RefreshTokenPayload = { userId: userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('auth.secret'),
      expiresIn: this.configService.get<string>('auth.refreshTokenExpire'),
    });
  }

  public async saveRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    this.usersService.updateUserRefreshToken(userId, refreshToken);
  }

  public async validateRefreshToken(userId: number, refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('auth.secret'),
      });
    } catch (error) {
      throw new CustomException(error, 190);
    }
  }
}

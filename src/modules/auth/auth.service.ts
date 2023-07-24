import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDTO: UserDTO) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.secret'),
        expiresIn: this.configService.get<string>('auth.expireIn'),
      }),
    };
  }
}

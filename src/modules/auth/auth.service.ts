import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isNull } from 'lodash';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { UserDTO } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDTO: UserDTO) {
    this.usersService.createUser(userDTO);
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

  async signIn(user: User): Promise<any> {
    if (user === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
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

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isNull } from 'lodash';
import { UserDTO } from '../user/dto/user.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

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

  async signIn(user: User): Promise<string | null> {
    if (user === null) {
      return null;
    }
    const payload = { sub: user.id, username: user.username };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('auth.secret'),
      expiresIn: this.configService.get<string>('auth.expireIn'),
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { isNull } from 'lodash';

const SALT = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async createUser(userDTO: UserDTO): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { username: userDTO.username },
    });
    if (!isNull(existUser)) {
      throw new HttpException('Existed username', HttpStatus.BAD_REQUEST);
    }
    const newUser = new User();
    newUser.username = userDTO.username;
    const salt = await bcrypt.genSalt(SALT);
    const hash = await bcrypt.hash(userDTO.password, salt);
    newUser.phone = userDTO.phone;
    newUser.password = hash;
    return await this.userRepository.save(newUser);
  }
}

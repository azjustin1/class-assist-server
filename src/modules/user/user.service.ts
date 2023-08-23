import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { isNull } from 'lodash';
import { CommonService } from 'src/common/common.service';

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

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(userDTO: UserDTO): Promise<User> {
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

  async update(userDTO: UserDTO): Promise<User> {
    const existUser = CommonService.getExistEntity(
      this.userRepository,
      userDTO.id,
    );
    const updatedUser = { ...existUser, ...userDTO };
    return await this.userRepository.save(updatedUser);
  }

  async refreshUserToken(username: string, refreshToken: string) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ refreshToken: refreshToken })
      .where('username > :username', { username: username })
      .execute();
  }

  public async updateUserRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.getExistUserById(id);
    const newUser = { ...user, refreshToken: refreshToken };
    this.userRepository.save(newUser);
  }

  private async getExistUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}

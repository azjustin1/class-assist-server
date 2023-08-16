import { Catch, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { RoleDTO } from './dto/role.dto';
import { Role } from './entity/role.entity';

@Injectable()
@Catch(EntityNotFoundError)
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return await this.roleRepository.find();
  }

  async createNew(roleDTO: RoleDTO): Promise<Role> {
    const newRole = new Role();
    newRole.name = roleDTO.name;
    newRole.description = roleDTO.description
    return await this.roleRepository.save(roleDTO)
  }
}



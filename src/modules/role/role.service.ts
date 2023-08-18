import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDTO } from './dto/role.dto';
import { Role } from './entity/role.entity';

@Injectable()
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
    newRole.description = roleDTO.description;
    return await this.roleRepository.save(roleDTO);
  }

  async updateById(id: number, roleDTO: RoleDTO) {
    const existRole = await this.getExistRole(id);
    const updateRole = { ...existRole, ...roleDTO };
    return this.roleRepository.save(updateRole);
  }

  async deleteById(id: number) {
    const existRole = this.getExistRole(id);
    return this.roleRepository.delete((await existRole).id);
  }

  private async getExistRole(id: number): Promise<Role> {
    const existRole = await this.roleRepository.findOne({ where: { id: id } });
    if (!existRole) {
      throw new NotFoundException();
    }
    return existRole;
  }
}

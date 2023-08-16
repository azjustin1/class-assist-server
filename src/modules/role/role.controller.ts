import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './dto/role.dto';

@Controller('rest/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  getAllRoles() {
    return this.roleService.findAll();
  }

  @Post()
  createNewRole(@Body() roleDTO: RoleDTO) {
    return this.roleService.createNew(roleDTO);
  }
}

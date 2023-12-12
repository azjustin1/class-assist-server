import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { RoleDTO } from './dto/role.dto';
import { RoleService } from './role.service';

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

  @Put(':id')
  updateRole(@Param('id') id: number, @Body() roleDTO: RoleDTO) {
    return this.roleService.updateById(id, roleDTO);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteById(id);
  }
}

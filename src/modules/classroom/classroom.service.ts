import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from './entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../user/entity/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class ClassroomService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,

    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createClassroomDto: CreateClassroomDto) {
    const newClassroom = new Classroom();
    newClassroom.name = createClassroomDto.name;
    const createdUser = await this.userRepository.findOne({
      where: { id: (this.request.user as User).id },
    });
    newClassroom.createdUser = createdUser;
    console.log(newClassroom);
    return await this.classroomRepository.save(newClassroom);
  }

  async addNewStudent(name: string) {

  }

  findAll() {
    return this.classroomRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}

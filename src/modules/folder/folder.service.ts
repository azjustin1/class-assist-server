import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async create(createFolderDto: CreateFolderDto) {
    const newFolder = new Folder();
    newFolder.name = createFolderDto.name;
    if (createFolderDto.parentId) {
      const parentFolder = await this.folderRepository.findOne({
        where: { id: createFolderDto.parentId },
      });
      if (parentFolder !== null) {
        newFolder.parent = parentFolder;
      }
    }

    return this.folderRepository.save(newFolder);
  }

  findAll() {
    return this.folderRepository.find({
      relations: ['subfolders']
    });
  }

  async findOne(id: number) {
    return await this.folderRepository.findOne({
      where: { id: id },
      relations: ['subfolders'],
    });
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}

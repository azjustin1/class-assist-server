import {
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';

export interface IEntity {
  id: number;
}

@Injectable()
export class CommonService {
  private readonly loggerService: LoggerService;

  constructor() {
    this.loggerService = new Logger(CommonService.name);
  }

  static async getExistEntity<T extends IEntity>(
    repository: Repository<T>,
    id: number,
  ) {
    const existEntity = await repository.findOneBy({ id: id } as
      | FindOptionsWhere<T>
      | FindOptionsWhere<T>[]);
    if (!existEntity) {
      throw new NotFoundException(`${id} not found`);
    }
    return existEntity;
  }
}

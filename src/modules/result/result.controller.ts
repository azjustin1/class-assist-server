import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AnswerDTO } from '../exercise/dto/answer.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ResultService } from './result.service';

@Controller('api/result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post('submit/:id')
  create(@Param('id') id: number, @Body() answersDTO: AnswerDTO[]) {
    return this.resultService.create(id, answersDTO);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}

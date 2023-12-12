import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import { Public } from '../auth/jwt-auth.guard';
import { AnswerDTO } from './dto/answer.dto';

@Controller('api/exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  getAllExercise() {
    return this.exerciseService.getAll();
  }

  @Get(':id')
  getExerciseById(@Param('id') id: number) {
    return this.exerciseService.getExerciseById(id);
  }

  @Public()
  @Post()
  createExercise(@Body() exerciseDTO: ExerciseDTO) {
    return this.exerciseService.create(exerciseDTO);
  }

  @Public()
  @Post('submit/:id')
  submitExercise(@Param('id') id: number, @Body() answersDTO: AnswerDTO) {
    return this.exerciseService.submit(id, answersDTO);
  }
}

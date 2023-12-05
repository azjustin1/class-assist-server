import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import { Public } from '../auth/jwt-auth.guard';

@Controller('api/exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}


  @Public()
  @Get()
  getAllExercise() {
    return this.exerciseService.getAll();
  }

  @Public()
  @Post()
  createExercise(@Body() exerciseDTO: ExerciseDTO) {
    return this.exerciseService.create(exerciseDTO);
  }
}

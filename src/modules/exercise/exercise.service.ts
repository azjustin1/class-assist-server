import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseDTO } from './dto/exercise.dto';
import { Exercise } from './entity/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async getAll() {
    return this.exerciseRepository.find();
  }

  async create(exercise: ExerciseDTO) {
    const newExercise = new Exercise();
    newExercise.quizzes = exercise.quizzes;
    return await this.exerciseRepository.save(newExercise);
  }
}

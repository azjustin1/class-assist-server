import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerDTO } from './dto/answer.dto';
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

  async getExerciseById(id: number) {
    return this.exerciseRepository.findOne({
      where: {
        id: id,
      },
      relations: ['quizzes'],
    });
  }

  async create(exercise: ExerciseDTO) {
    const newExercise = new Exercise();
    newExercise.name = exercise.name;
    newExercise.quizzes = exercise.quizzes;
    return await this.exerciseRepository.save(newExercise);
  }

  async submit(exerciseId: number, answersDTO: AnswerDTO) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
      relations: ['quizzes'],
    });
    if (exercise === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Exercise } from '../exercise/entity/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { each, keyBy } from 'lodash';
import { AnswerDTO } from '../exercise/dto/answer.dto';
import { Quiz } from '../quiz/entity/quiz.entity';
import { Answer } from '../quiz/entity/answer.entity';
import { ExerciseService } from '../exercise/exercise.service';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,

    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,

    private readonly exerciseService: ExerciseService,
  ) {}

  async create(exerciseId: number, answersDTO: AnswerDTO[]) {
    const exercise = await this.exerciseService.getExerciseById(exerciseId);
    if (exercise === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const mapQuizById: Record<number, Quiz> = keyBy(exercise.quizzes, 'id');
    const result = new Result();
    const pointedAnswers: Answer[] = [];
    each(answersDTO, (answer: AnswerDTO) => {
      const quiz = mapQuizById[answer.quizId];
      const answerEntity = new Answer();
      answerEntity.content = answer.content;
      answerEntity.quiz = quiz;
      answerEntity.point = answer.point;
      const isCorrect = quiz.correctAnswer.includes(answer.content);
      if (isCorrect) {
        result.point += answer.point;
      }
      answerEntity.isCorrect = isCorrect;
      pointedAnswers.push(answerEntity);
    });
    result.answers = await this.answerRepository.save(pointedAnswers);
    result.exercise = exercise;
    return await this.resultRepository.save(result);
  }

  findAll() {
    return `This action returns all result`;
  }

  findOne(id: number) {
    return this.resultRepository.findOne({
      where: {
        id: id,
      },
      relations: ['answers']
    });
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}

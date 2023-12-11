import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { ExerciseService } from '../exercise/exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../exercise/entity/exercise.entity';
import { Quiz } from '../quiz/entity/quiz.entity';
import { Result } from './entities/result.entity';
import { Answer } from '../quiz/entity/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, Quiz, Result, Answer])],
  controllers: [ResultController],
  providers: [ResultService, ExerciseService],
})
export class ResultModule {}

import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entity/exercise.entity';
import { ExerciseController } from './exercise.controller';
import { Quiz } from '../quiz/entity/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, Quiz])],
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}

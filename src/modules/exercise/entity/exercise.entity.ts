import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Quiz } from 'src/modules/quiz/entity/quiz.entity';
import { Result } from 'src/modules/result/entities/result.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Exercise extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Quiz, (quiz) => quiz.exercise)
  @JoinTable({
    name: 'exercise_quiz',
  })
  quizzes: Quiz[];

  @Column()
  name: string;

  @OneToMany(() => Result, (result) => result)
  results: Result[];
}

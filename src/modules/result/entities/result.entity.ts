import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Exercise } from 'src/modules/exercise/entity/exercise.entity';
import { Answer } from 'src/modules/quiz/entity/answer.entity';
import { Quiz } from 'src/modules/quiz/entity/quiz.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Result extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Answer, (answer) => answer.id)
  @JoinTable({
    name: 'result_answer',
  })
  answers: Answer[];

  @ManyToMany(() => Quiz, (quiz) => quiz)
  @JoinTable({
    name: 'result_quiz',
  })
  quizzes: Quiz[];

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  point: number = 0;

  @ManyToOne(() => Exercise, {
    cascade: true,
  })
  exercise: Exercise;
}

import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Quiz } from 'src/modules/quiz/entity/quiz.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercise extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Quiz, (quiz) => quiz.exercise, {
    eager: true,
    cascade: true,
  })
  quizzes: Quiz[];
}

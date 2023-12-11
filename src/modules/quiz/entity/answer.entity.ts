import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Result } from 'src/modules/result/entities/result.entity';

@Entity()
export class Answer extends CommonEntity {
  @Column()
  content: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Quiz, (quiz) => quiz, { eager: true })
  quiz: Quiz;

  @ManyToOne(() => Result, (result) => result.id)
  result: Result;

  @Column()
  point: number;
}

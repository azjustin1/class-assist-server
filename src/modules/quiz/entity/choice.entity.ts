import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity()
export class Choice extends CommonEntity {
  @Column()
  content: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.choices)
  quiz: Quiz;
}

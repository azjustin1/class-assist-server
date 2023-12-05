import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Quiz, (quiz) => quiz.choices)
  quiz: Quiz
}

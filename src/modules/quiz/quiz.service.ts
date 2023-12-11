import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Quiz } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizDTO } from './dto/quiz.dto';
import { forEach } from 'lodash';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  findByIds(ids: number[]) {
    return this.quizRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(quizDTO: QuizDTO) {
    const newQuiz = new Quiz();
    newQuiz.question = quizDTO.question;
    newQuiz.choices = quizDTO.choices;
    newQuiz.type = quizDTO.type;
    newQuiz.correctAnswer = quizDTO.correctAnswer.toString();
    return await this.quizRepository.save(newQuiz);
  }

  async answerQuiz(quizDTO: QuizDTO) {
    const quiz: Quiz = await this.quizRepository.findOne({
      where: { id: quizDTO.id },
    });
    forEach(quiz.choices, (choice) => {});
  }
}

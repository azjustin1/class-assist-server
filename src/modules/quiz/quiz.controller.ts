import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Public } from '../auth/jwt-auth.guard';
import { QuizDTO } from './dto/quiz.dto';

@Controller('api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Public()
  @Get()
  getAll() {
    return this.quizService.findAll();
  }

  @Public()
  @Post()
  createNewQuiz(@Body() quizDTO: QuizDTO) {
    return this.quizService.create(quizDTO);
  }

  @Post('answer-question')
  answerQuestion() {
    
  }
}

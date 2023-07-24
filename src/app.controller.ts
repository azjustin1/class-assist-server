import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/rest")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/app")
  getHello(): string {
    return this.appService.getHello();
  }
}

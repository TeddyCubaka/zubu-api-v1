import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): object {
    return {
      name: 'teddy cubaka',
      proffession: 'Développeur fullstack',
    };
  }
}

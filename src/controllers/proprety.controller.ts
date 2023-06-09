import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Proprety } from 'src/schemas/proprety.schema';
import { PropretyService } from 'src/services/proprety.service';

@Controller('propreties')
export class PropretyController {
  constructor(private readonly propretyService: PropretyService) {}

  @Post()
  async createProduct(@Res() response, @Body() proprety: Proprety) {
    const newProduct = await this.propretyService.create(proprety);
    return response.status(HttpStatus.CREATED).json({ newProduct });
  }

  @Get()
  async fetchAll(@Res() response) {
    const products = await this.propretyService.readAll();
    return response.status(HttpStatus.OK).json({ products });
  }
}

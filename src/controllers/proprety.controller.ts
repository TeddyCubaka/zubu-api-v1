import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { response } from 'express';
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
    const propreties = await this.propretyService.readAll();
    return response.status(HttpStatus.OK).json({ propreties });
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string, @Res() response) {
    const proprety = await this.propretyService.readById(id);
    return response.status(HttpStatus.OK).json({ proprety });
  }

  @Put('/:id')
  async updateOneById(
    @Param('id') id: string,
    @Body() proprety: Proprety,
    @Res() response,
  ) {
    const newProprety = await this.propretyService.update(id, proprety);
    return response.status(HttpStatus.OK).json({ newProprety });
  }

  @Delete('/:id')
  async deleteOneById(@Param('id') id: string, @Res() response) {
    const propretyDelete = await this.propretyService.delete(id);
    return response.status(HttpStatus.OK).json({ propretyDelete });
  }
}

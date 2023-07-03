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
import { Proprety } from 'src/schemas/proprety.schema';
import { PropretyService } from 'src/services/proprety.service';

@Controller('propreties')
export class PropretyController {
  constructor(private readonly propretyService: PropretyService) {}

  @Post()
  async createProduct(@Res() response, @Body() proprety: Proprety) {
    console.log(proprety);

    const newProduct = await this.propretyService.create(proprety);
    return response.status(HttpStatus.CREATED).json({ newProduct });
  }

  @Get()
  async fetchAll(@Res() response) {
    const propreties = await this.propretyService.readAll();
    return response.status(HttpStatus.OK).json({ propreties });
  }

  @Get('/select/:propretiesIds')
  async selectMayById(
    @Param('propretiesIds') propretiesIds: string,
    @Res() response,
  ) {
    const propreties = await this.propretyService.readManyById(propretiesIds);
    return response.status(HttpStatus.OK).json(propreties);
  }

  @Get('/proprety/:id')
  async getOneById(@Param('id') id: string, @Res() response) {
    const proprety = await this.propretyService.readById(id);
    return response.status(HttpStatus.OK).json({ proprety });
  }

  @Get('/chakeAddress')
  async chakeAddress(@Body('address') address: string, @Res() response) {
    const chacker = await this.propretyService.chakeAddress(address);
    if (chacker === null)
      return response
        .status(HttpStatus.OK)
        .json({ canBeUsed: true, propretyIdOfThisAddress: chacker });
    else if (chacker)
      return response
        .status(HttpStatus.OK)
        .json({ canBeUsed: false, propretyIdOfThisAddress: chacker._id });
    else
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ chacker });
  }

  @Put('proprety/:id')
  async updateOneById(
    @Param('id') id: string,
    @Body() proprety: Proprety,
    @Res() response,
  ) {
    const newProprety = await this.propretyService.update(id, proprety);
    return response.status(HttpStatus.OK).json({ newProprety });
  }

  @Delete('proprety/:id')
  async deleteOneById(@Param('id') id: string, @Res() response) {
    const propretyDelete = await this.propretyService.delete(id);
    return response.status(HttpStatus.OK).json({ propretyDelete });
  }
}

import {
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async getOneUserById(@Res() response, @Param() id) {
    const user = await this.usersService.findOneById(id);
    return response.status(HttpStatus.OK).json(user);
  }

  @Put('/:id')
  async updateUser(@Res() response, @Req() request) {
    const newUpdate = await this.usersService.update(
      request.headers.authorization.sub,
      request.body,
    );
    return response.status(HttpStatus.OK).json({
      newUpdate,
      body: request.body,
      auth: request.headers.authorization.sub,
    });
  }

  @Put('save_proprety')
  async addToFavorite(@Res() response, @Req() request) {
    if (!request.body.propretyId)
      return response
        .status(HttpStatus.OK)
        .json({ message: 'La clé propretyId est abscente' });
    else {
      const newUpdate = await this.usersService.addToFavoritePropreties(
        request.body.propretyId,
        request.headers.authorization.sub,
      );
      return response.status(HttpStatus.OK).json({
        newUpdate,
        body: request.body,
        auth: request.headers.authorization.sub,
      });
    }
  }

  @Put('remove_proprety')
  async removeToFavorite(@Res() response, @Req() request) {
    if (!request.body.propretyId)
      return response
        .status(HttpStatus.OK)
        .json({ message: 'La clé propretyId est abscente' });
    else {
      const newUpdate = await this.usersService.removeToFavoritePropreties(
        request.body.propretyId,
        request.headers.authorization.sub,
      );
      return response.status(HttpStatus.OK).json({
        newUpdate,
        body: request.body,
        auth: request.headers.authorization.sub,
      });
    }
  }

  @Get()
  async fetchAll(@Res() response, @Headers() headers) {
    const user = await this.usersService.getAll();
    return response.status(HttpStatus.OK).json(user);
  }
}

import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { signupData } from 'src/interfaces/users.type';
import { getHashPassword, signupDataValidator } from 'src/utils/user.utils';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getMessage(@Res() response) {
    return response.status(HttpStatus.OK).json({ message: 'Bien reçu' });
  }

  @Post('/signup')
  async createProduct(@Res() response, @Body() user: signupData) {
    const datasStatus = signupDataValidator(user);
    if (datasStatus.passed === false)
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Ce(s) paramettre(s) est(sont) maquant(s) : ${datasStatus.datasMissed.join(
          ' ',
        )}`,
      });
    user.password = await getHashPassword(user.password);
    const newUser = await this.authService.singUp(user);
    return response.status(HttpStatus.CREATED).json({ newUser });
  }
}

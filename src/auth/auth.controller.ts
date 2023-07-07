import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { signupData } from '../interfaces/users.type';
import { getHashPassword, signupDataValidator } from '../utils/user.utils';
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
    const ServerResponse = {
      user: newUser,
      acces: await this.authService.getToken({
        userId: newUser._id,
        username: newUser.username,
      }),
    };
    return response.status(HttpStatus.CREATED).json(ServerResponse);
  }

  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() response) {
    const user = await this.authService.signIn(
      signInDto.mail,
      signInDto.password,
      'mail',
    );
    if (user.hasNotFound)
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'mail ou mot de passe invalide' });
    return response.status(HttpStatus.OK).json({
      user,
      access: await this.authService.getToken({
        userId: user._id,
        username: user.username,
      }),
    });
  }
}

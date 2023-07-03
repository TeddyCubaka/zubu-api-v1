import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { signupData } from 'src/interfaces/users.type';
import { UsersService } from 'src/users/users.service';
import { verifyPassord } from 'src/utils/user.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singUp(datas: signupData): Promise<any> {
    const user: any = await this.usersService.create(datas);
    user.password = '';
    const payload = {
      sub: user._id,
      username: user.username,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async signIn(
    connexionId: string,
    passwordInputed: string,
    idUsed: string,
  ): Promise<any> {
    let user: any;
    if (idUsed === 'mail')
      user = await this.usersService.findOneByMail(connexionId);
    else if (idUsed === 'username')
      user = await this.usersService.findOneByUsername(connexionId);
    else if (idUsed === 'phoneNumber')
      user = await this.usersService.findOneByPhoneNumber(connexionId);

    if (user === null) return { hasNotFound: true };
    let isPasswordValid = await verifyPassord(passwordInputed, user.password);

    if (!isPasswordValid) {
      return { hasNotFound: true };
    }
    user.password = '';
    const payload = {
      sub: user._id,
      username: user.username,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }
}

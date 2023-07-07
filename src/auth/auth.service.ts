import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getTokenData, signupData } from '../interfaces/users.type';
import { UsersService } from '../users/users.service';
import { verifyPassord } from '../utils/user.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken({ userId, username }: getTokenData): Promise<string> {
    const payload = {
      sub: userId,
      username: username,
      expireDate: new Date().getTime() + Number(process.env.CUSTOM_EXP_DATE),
    };
    return await this.jwtService.signAsync(payload);
  }

  async singUp(datas: signupData): Promise<any> {
    const user: any = await this.usersService.create(datas);
    user.password = '';

    return user;
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
    const isPasswordValid = await verifyPassord(passwordInputed, user.password);

    if (!isPasswordValid) {
      return { hasNotFound: true };
    }
    user.password = '';

    return user;
  }
}

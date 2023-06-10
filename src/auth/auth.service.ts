import { Injectable } from '@nestjs/common';
import { signupData } from 'src/interfaces/users.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async singUp(datas: signupData): Promise<any> {
    const user = await this.usersService.create(datas);
    return user;
  }
}

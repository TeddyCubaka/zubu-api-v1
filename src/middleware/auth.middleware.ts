import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const decodedJwtAccessToken: any = this.jwtService.decode(
      request.headers.authorization.split(' ')[1],
    );
    request.headers.authorization = decodedJwtAccessToken;

    const myTime = new Date().getTime();

    let isUserIdNoValid: boolean = false;
    await this.usersService
      .findOneById(decodedJwtAccessToken.sub)
      .then((user) => {
        if (user == null) isUserIdNoValid = true;
      })
      .catch(() => (isUserIdNoValid = true));

    if (decodedJwtAccessToken.expireDate < myTime)
      response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'The token has expired' });
    else if (isUserIdNoValid)
      response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid token.' });
    else next();
  }
}

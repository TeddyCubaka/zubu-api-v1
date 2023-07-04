import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const decodedJwtAccessToken: any = this.jwtService.decode(
      request.headers.authorization.split(' ')[1],
    );
    request.headers.authorization = decodedJwtAccessToken;

    const myTime = new Date().getTime();
    if (decodedJwtAccessToken.expireDate < myTime)
      response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'The token as expired' });
    else next();
  }
}

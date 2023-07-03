import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(request: Request, res: Response, next: NextFunction) {
    const decodedJwtAccessToken: any = this.jwtService.decode(
      request.headers.authorization.split(' ')[1],
    );
    request.body.access = decodedJwtAccessToken;
    console.log(process.env.JWT_SECRET_KEY);
    next();
  }
}

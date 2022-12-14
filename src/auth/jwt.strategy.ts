import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  userId: User['id'];
  username: User['username'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    //  check if user exist
    if (!(await this.usersService.user(payload.userId))) {
      throw new UnauthorizedException();
    }

    return { userId: payload.userId, username: payload.username };
  }
}

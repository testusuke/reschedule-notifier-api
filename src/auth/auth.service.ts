import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';

type PasswordOmitUser = Omit<User, 'password'>;

interface JwtPayload {
  userId: User['id'];
  username: User['username'];
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(
    username: User['username'],
    pass: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.userByName(username);

    //  compare password
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: PasswordOmitUser) {
    const payload: JwtPayload = { userId: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

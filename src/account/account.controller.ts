import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

type PasswordOmitUser = Omit<User, 'password'>;

@Controller('account')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: PasswordOmitUser }) {
    const user = req.user;

    return await this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req: { user: PasswordOmitUser }) {
    return req.user;
  }
}

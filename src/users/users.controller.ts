import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.user(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async users(): Promise<User[]> {
    return this.usersService.users();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.createUser({
      username: username,
      password: password,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<object> {
    await this.usersService.deleteUser(Number(id));

    return {
      message: 'deleted user',
    };
  }
}

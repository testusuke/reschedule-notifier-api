import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.user(Number(id));
  }

  @Get()
  async users(): Promise<User[]> {
    return this.usersService.users();
  }

  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    return this.usersService.createUser({
      username: username,
      password: hashed,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    await this.usersService.deleteUser(Number(id));

    return 'deleted user';
  }
}

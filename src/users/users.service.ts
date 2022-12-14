import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const systemUserPass = this.configService.get<string>('SYSTEM_USER_PASSWORD');
    if (systemUserPass) {
      this.createUser({
        username: 'system',
        password: systemUserPass,
      }).then((user) => {
        if (user) {
          console.log('created system user.');
        }
      });
    }
  }

  async user(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async userByName(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    //  check if username is already used
    const num = await this.prisma.user.count({
      where: {
        username: data.username,
      },
    });
    if (num > 0) {
      return null;
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data,
    });
  }

  async deleteUser(id: number): Promise<void> {
    console.log(id);
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

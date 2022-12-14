import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Schedule, Prisma } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async schedules(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany();
  }

  async schedule(id: number): Promise<Schedule> {
    return this.prisma.schedule.findUnique({
      where: { id: id },
    });
  }

  async createSchedule(data: Prisma.ScheduleUncheckedCreateInput) {
    return this.prisma.schedule.create({
      data,
    });
  }

  async updateSchedule(id: number, data: Prisma.ScheduleUncheckedUpdateInput) {
    return this.prisma.schedule.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async deleteSchedule(id: number) {
    await this.prisma.schedule.delete({
      where: {
        id: id,
      },
    });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

interface JwtPayload {
  userId: User['id'];
  username: User['username'];
}

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async schedules(): Promise<Schedule[]> {
    return this.scheduleService.schedules();
  }

  @Get(':id')
  async schedule(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.schedule(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteSchedule(@Param('id') id: string): Promise<string> {
    await this.scheduleService.deleteSchedule(Number(id));

    return 'ok';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createSchedule(
    @Request() req: { user: JwtPayload },
    @Body('subject') subject: string,
    @Body('note') note?: string,
    @Body('target') target?: string,
    @Body('date') date?: string,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule({
      subject: subject,
      note: note,
      target: target,
      date: new Date(date),
      issuer_id: req.user.userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateSchedule(
    @Request() req: { user: JwtPayload },
    @Param('id') id: string,
    @Body('subject') subject: string,
    @Body('note') note?: string,
    @Body('target') target?: string,
    @Body('date') date?: string,
  ): Promise<Schedule> {
    return this.scheduleService.updateSchedule(Number(id), {
      subject: subject,
      note: note,
      target: target,
      date: new Date(date),
      issuer_id: req.user.userId,
    });
  }
}

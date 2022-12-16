import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

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
    @Body('board_id') board_id: string,
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
      board: {
        connect: {
          id: Number(board_id),
        },
      },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body('board_id') board_id: string,
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
      board: {
        connect: {
          id: Number(board_id),
        },
      },
    });
  }
}

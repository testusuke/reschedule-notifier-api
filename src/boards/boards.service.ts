import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Board } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async boards(): Promise<Board[]> {
    return this.prisma.board.findMany({
      include: {
        schedules: true,
      },
    });
  }

  async board(id: number): Promise<Board> {
    return this.prisma.board.findUnique({
      where: {
        id: id,
      },
      include: {
        schedules: true,
      },
    });
  }

  async createBoard(data: Prisma.BoardCreateInput): Promise<Board> {
    return this.prisma.board.create({
      data,
    });
  }

  async updateBoard(id: number, data: Prisma.BoardUpdateInput): Promise<Board> {
    return this.prisma.board.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async deleteBoard(id: number) {
    //  remove all schedule
    const deletedSchedule = this.prisma.schedule.deleteMany({
      where: {
        board_id: id,
      },
    });

    //  remove board
    const deletedBoard = this.prisma.board.delete({
      where: {
        id: id,
      },
    });

    await this.prisma.$transaction([deletedSchedule, deletedBoard]);
  }
}

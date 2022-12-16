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
import { BoardsService } from './boards.service';
import { Board } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async boards(): Promise<Board[]> {
    return this.boardsService.boards();
  }

  @Get(':id')
  async board(@Param('id') id: string): Promise<Board> {
    return this.boardsService.board(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<string> {
    await this.boardsService.deleteBoard(Number(id));

    return 'ok';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Board> {
    return this.boardsService.createBoard({
      title: title,
      description: description,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Board> {
    return this.boardsService.updateBoard(Number(id), {
      title: title,
      description: description,
    });
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [BoardsService, PrismaService],
  controllers: [BoardsController],
})
export class BoardsModule {}

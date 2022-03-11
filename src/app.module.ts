import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [],
  controllers: [AppController, BookController],
  providers: [PrismaService, AppService, BookService],
})
export class AppModule {}

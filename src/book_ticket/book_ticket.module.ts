import { Module } from '@nestjs/common';
import { BookTicketService } from './book_ticket.service';
import { BookTicketController } from './book_ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketName, TicketSchema } from './schema/ticket';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TicketName, schema: TicketSchema }]),
  ],
  providers: [BookTicketService],
  controllers: [BookTicketController],
})
export class BookTicketModule {}

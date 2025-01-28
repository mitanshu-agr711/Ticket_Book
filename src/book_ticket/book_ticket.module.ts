import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookTicketService } from './book_ticket.service';
import { BookTicketController } from './book_ticket.controller';
import { TicketSchema, TicketName } from './schema/ticket';
import { CloudinaryModule } from 'src/clodinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TicketName, schema: TicketSchema }]), // Register the schema
    CloudinaryModule,
  ],
  providers: [BookTicketService],
  controllers: [BookTicketController],
})
export class BookTicketModule {}

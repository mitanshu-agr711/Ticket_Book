  

import { Injectable } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { BookTicket } from './interfaces/book_ticket.interface';
import { TicketDetails } from './interfaces/ticket_details.interface';

@Injectable()
export class BookTicketService {
  private book_ticket: any; // Define the book_ticket property with the correct type

  @Post
  createTicket(ticketDetails: TicketDetails): Promise<BookTicket> {
    return this.book_ticket.create(ticketDetails);
  }
}

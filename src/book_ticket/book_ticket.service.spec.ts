import { Test, TestingModule } from '@nestjs/testing';
import { BookTicketService } from './book_ticket.service';

describe('BookTicketService', () => {
  let service: BookTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookTicketService],
    }).compile();

    service = module.get<BookTicketService>(BookTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

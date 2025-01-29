import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTicketDto } from '../DTO/ticket.dto';
import { BookTicketService } from './book_ticket.service';
// import { get } from 'http';/

@Controller('book-ticket')
export class BookTicketController {
  constructor(private readonly bookTicketService: BookTicketService) {}

  @Post('/ticket-book')
  @UseInterceptors(FileInterceptor('image'))
  async createTicket(
    @Body() createTicketDto: CreateTicketDto, // Handle the form-data body
    @UploadedFile() image: Express.Multer.File, // Handle the uploaded file
  ) {
    console.log('Request Data:', createTicketDto);

    let uploadedImage: { url: string };
    try {
      const uploadResult =
        await this.bookTicketService.uploadImageToCloudinary(image);
      if ('url' in uploadResult) {
        uploadedImage = uploadResult as { url: string };
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      throw new Error('Image upload failed');
    }

    const ticketData = {
      ...createTicketDto,
      image: uploadedImage.url,
    };

    return await this.bookTicketService.createTicket(ticketData);
  }
  @Get('/movie')
  async getTicket() {
    return await this.bookTicketService.getTicket();
  }
}

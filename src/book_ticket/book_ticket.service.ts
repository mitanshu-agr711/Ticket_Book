import { Injectable, BadRequestException } from '@nestjs/common';
// import type { Express } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketName } from './schema/ticket';
import { CreateTicketDto } from './DTO/ticket.dto';
import { CloudinaryService } from '../clodinary/clodinary.service';

@Injectable()
export class BookTicketService {
  constructor(
    @InjectModel(TicketName)
    private readonly ticketModel: Model<CreateTicketDto>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createTicket(ticketDetails: CreateTicketDto) {
    ticketDetails.rate = this.convertToNumber(ticketDetails.rate);
    ticketDetails.price = this.convertToNumber(ticketDetails.price);
    console.log('Ticket Details:', ticketDetails);

    if (isNaN(ticketDetails.rate) || isNaN(ticketDetails.price)) {
      throw new BadRequestException('Rate and Price must be valid numbers.');
    }

    const newTicket = new this.ticketModel(ticketDetails);
    return await newTicket.save();
  }

  private convertToNumber(value: any): number {
    const num = Number(value);
    if (isNaN(num)) {
      throw new BadRequestException('Invalid value for rate or price.');
    }
    return num;
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    try {
      return await this.cloudinaryService.uploadImage(file);
    } catch (error: any) {
      throw new BadRequestException('Failed to upload image: ' + error.message);
    }
  }
  async getTicket() {
    return await this.ticketModel.find();
  }
}

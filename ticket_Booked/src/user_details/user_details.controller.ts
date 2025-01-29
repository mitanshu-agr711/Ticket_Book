import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from '../DTO/user.dto';
import { UserDetailsService } from './user_details.service';

@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly userService: UserDetailsService) {}

  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return result;
    } catch (error) {
      throw new BadRequestException(
        (error as any).message || 'An unknown error occurred',
      );
    }
  }

  @Get('/customer')
  async getCustomer(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return await this.userService.getCustomer(email);
  }

  @Get('/details')
  async getBooked(
    @Query('movie') movie?: string,
    @Query('timing') timing?: string,
    @Query('date') date?: string,
  ) {
    if (!movie) {
      throw new BadRequestException('Movie query parameter is required');
    }
    let parsedDate: string | undefined;

    if (date) {
     
      const dateParts = date.split('-');
      const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; 
      parsedDate = isoDate;
    }

    return await this.userService.getBooked(movie, parsedDate, timing);
  }
}

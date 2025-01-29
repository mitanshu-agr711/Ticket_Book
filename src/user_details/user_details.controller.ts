import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../DTO/user.dto';
import { UserDetailsService } from './user_details.service';
// import { ErrorResponse } from '../types/errorResponse';

@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly userService: UserDetailsService) {}

  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('An unknown error occurred');
      }
    }
  }
}

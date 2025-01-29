import { Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  Name: string;
  Seats: string[];
  movie: string;
  timing: string;
  date: string;
}

import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/userdetails';
import { CreateUserDto } from '../DTO/user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async createUser(userDetails: CreateUserDto): Promise<{
    user: Partial<UserDocument>;
    access_token: string;
  }> {
    try {
      const existingUser = await this.userModel
        .findOne({ email: userDetails.email })
        .exec();

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const newUser = new this.userModel(userDetails);
      const savedUser = await newUser.save();

      const userForToken = {
        email: savedUser.email,
        Name: savedUser.Name,
      } as User;

      const token = this.authService.generateToken(userForToken);

      return {
        user: {
          _id: savedUser._id,
          email: savedUser.email,
          Name: savedUser.Name,
          Seats: savedUser.Seats,
          movie: savedUser.movie,
          timing: savedUser.timing,
          date: savedUser.date,
        },
        ...token,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('An unexpected error occurred');
    }
  }
  async getCustomer(email: string) {
    return await this.userModel.findOne({ email });
  }

  async getBooked(movie?: string, date?: string, timing?: string) {
    if (!movie) {
      throw new Error('Movie name is required');
    }

    if (movie && !timing && !date) {
      // Case 1:
      return await this.userModel.find(
        { movie },
        { date: 1, timing: 1, _id: 0 },
      );
    }

    if (movie && timing && date) {
      console.log('Date:', date);
      // Case 2:
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0); 
     console.log('Start of Day:', startOfDay);
      const bookedSeats = await this.userModel.find(
        { movie, timing, date: startOfDay }, 
        { Name: 1, email: 1, Seats: 1, _id: 0 },
      );
      const totalSeats = 100;
      const bookedSeatsCount = bookedSeats.reduce(
        (sum, user) => sum + user.Seats.length,
        0,
      );
      const seatsLeft = totalSeats - bookedSeatsCount;
      console.log('Seats Left:', seatsLeft);
      console.log('Booked Seats:', bookedSeats);

      return { bookedSeats, seatsLeft };
    }

    return [];
  }
}

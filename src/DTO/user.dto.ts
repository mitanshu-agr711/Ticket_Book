import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  Name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsArray()
  @IsNotEmpty()
  Seats!: string[];

  @IsString()
  @IsNotEmpty()
  movie!: string;

  @IsString()
  @IsNotEmpty()
  timing!: string;

  @IsDate()
  @IsNotEmpty()
  date!: Date;
}

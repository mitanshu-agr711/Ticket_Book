import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rate!: number;

  @IsNumber()
  price!: number;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsString()
  @IsNotEmpty()
  image!: string;
}

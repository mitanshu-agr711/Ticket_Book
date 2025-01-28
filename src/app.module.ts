import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookTicketModule } from './book_ticket/book_ticket.module';
import { CloudinaryModule } from './clodinary/cloudinary.module';
import { CloudinaryService } from './clodinary/clodinary.service';

@Module({
  imports: [
    // Global configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Path to the .env file
    }),

    // Mongoose setup with async configuration
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUri = configService.get<string>('DB_URL');
        // console.log('DB_URL:', dbUri);
        if (!dbUri) {
          throw new Error(
            'DATABASE is not defined in the environment variables.',
          );
        }
        console.log(' successfully Connecting to DB:');
        return { uri: dbUri };
      },
    }),

    // BookTicket feature module
    BookTicketModule,

    CloudinaryModule,
  ],
  providers: [CloudinaryService],
})
export class AppModule {}

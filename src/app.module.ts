import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookTicketModule } from './book_ticket/book_ticket.module';
import { CloudinaryModule } from './clodinary/cloudinary.module';
import { CloudinaryService } from './clodinary/clodinary.service';
import { UserDetailsController } from './user_details/user_details.controller';
import { UserDetailsService } from './user_details/user_details.service';
import { UserDetailsModule } from './user_details/user_details.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUri = configService.get<string>('DB_URL');

        if (!dbUri) {
          throw new Error(
            'DATABASE is not defined in the environment variables.',
          );
        }
        console.log(' successfully Connecting to DB:');
        return { uri: dbUri };
      },
    }),

    BookTicketModule,

    CloudinaryModule,

    UserDetailsModule,

    AuthModule,
  ],
  providers: [CloudinaryService, UserDetailsService, JwtStrategy],
  controllers: [UserDetailsController],
})
export class AppModule {}

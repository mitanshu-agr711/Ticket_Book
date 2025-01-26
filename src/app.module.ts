import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookTicketModule } from './book_ticket/book_ticket.module';
// import { GeneTicketController } from './gene_ticket/gene_ticket.controller';

if (!process.env.DB_URL) {
  throw new Error('DATABASE  is not defined in the environment variables.');
}
const dbUri: string = process.env.DB_URL;

@Module({
  //make .env file global
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(dbUri),
    BookTicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

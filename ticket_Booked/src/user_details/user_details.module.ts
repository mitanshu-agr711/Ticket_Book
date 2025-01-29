import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetailsController } from './user_details.controller';
import { UserDetailsService } from './user_details.service';
import { UserSchema, UserDetails } from '../schema/userdetails';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: UserDetails, schema: UserSchema }]),
  ],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports: [UserDetailsService, MongooseModule],
})
export class UserDetailsModule {}

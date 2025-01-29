import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// import { JwtStrategy } from '../jwt-strategy/jwt-strategy.service';

console.log(process.env.screteKey);
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.screteKey,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

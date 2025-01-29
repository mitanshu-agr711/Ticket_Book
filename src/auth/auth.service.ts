import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schema/userdetails';

export interface JwtPayload {
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): { access_token: string } {
    if (
      !user ||
      typeof user.email !== 'string' ||
      typeof user.Name !== 'string'
    ) {
      throw new Error('Invalid user object');
    }

    const payload: JwtPayload = {
      email: user.email,
      name: user.Name,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '2d',
      }),
    };
  }

  validateUser(payload: JwtPayload): Promise<JwtPayload> {
    return Promise.resolve({
      email: payload.email,
      name: payload.name,
    });
  }
}

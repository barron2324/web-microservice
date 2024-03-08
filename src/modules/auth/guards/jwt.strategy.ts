import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { payloadUserInterface } from '../interfaces/payload-user.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('authentication.secret'),
    })
  }

//   async validate(payload: any) {
// console.log(payload)
//     return { userId: payload.sub, username: payload.username };
//   }

  async validate(payload: payloadUserInterface) {
    const { email } = payload

    const user = await this.authService.getByEmail(email)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
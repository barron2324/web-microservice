import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { payloadUserInterface } from '../interfaces/payload-user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('authentication.secret'),
    })
  }

  async validate(payload: payloadUserInterface) {
    const { userId } = payload

    const user = await this.authService.getByUserId(userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}

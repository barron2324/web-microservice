import {
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { usersInterface } from 'src/modules/users/interfaces/users.interface'
import { loginUserDto } from '../dto/user-login.dto'

import { Cache } from '@nestjs/cache-manager'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { AuthService } from '../auth.service'

@Injectable()
export class LoginAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LoginAuthGuard.name)
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {
      super()
    }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const body = plainToInstance(loginUserDto, request.body)

    let user: usersInterface
    try {
      user = await this.authService.getByEmail(body.email)
      this.logger.log(user)
    } catch (e) {
      this.logger.error(e?.message ?? JSON.stringify(e))
      throw new InternalServerErrorException({
        message: e?.message ?? JSON.stringify(e),
      })
    }

    if (!user) {
      throw new UnprocessableEntityException('Not Found User.')
    } 

    const blockUser = await this.authService.getBlockUser(user.email)
    if (blockUser) {
      throw new UnauthorizedException('This account benned!')
    } 

    let counter: number = (
      await this.cacheManager.get(`login-failures:${user.email}`)) || 0;

    if (counter >= 3) {
      throw new UnauthorizedException(
        'Login blocked due to too many failed attempts',
      )
    }

    const matchPassword = await bcrypt.compare(body.password, user.password)
    if (!matchPassword) {
      await this.cacheManager.set(
        `login-failures:${user.email}`,
        counter + 1,
        180000,
      )
      throw new UnprocessableEntityException(
        `Password are not valid ${counter + 1}.`,
      )
    }

    await this.cacheManager.del(`login-failures:${user.email}`)
    
    return true
  }
}

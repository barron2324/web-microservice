import { CacheModuleAsyncOptions } from '@nestjs/common/cache/interfaces/cache-module.interface'
import { ConfigModule, ConfigService } from '@nestjs/config'
import redisStore from 'cache-manager-redis-store'

const RegisterCacheOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      store: redisStore,
      host: configService.get<string>('redis.host'),
      port: configService.get<number>('redis.port'),
      ttl: configService.get('cache_ttl') || 5,
    }
  },
  inject: [ConfigService],
}

export default RegisterCacheOptions

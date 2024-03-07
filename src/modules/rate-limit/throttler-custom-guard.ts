import { ExecutionContext, Injectable } from '@nestjs/common'
import { ThrottlerException, ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler'

@Injectable()
export class ThrottlerCustomGuard extends ThrottlerGuard {
    async handleRequest(
        context: ExecutionContext,
        limit: number,
        ttl: number,
        throttler: ThrottlerOptions
    ): Promise<boolean> {
        const { req } = this.getRequestResponse(context)
        const ip = req?.headers['x-original-forwarded-for']
        const key = `${this.generateKey(context, ip, throttler.name)}:${req.originalUrl}`
        const { totalHits } = await this.storageService.increment(key, ttl)
        if (totalHits >= limit) {
            throw new ThrottlerException()
        }
        await this.storageService.increment(key, ttl)
        return true
    }
}
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

const ReqUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req.user
})

export default ReqUser

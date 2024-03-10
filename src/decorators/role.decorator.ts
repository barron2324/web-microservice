import { SetMetadata } from '@nestjs/common'
import { rolesUserEnum } from 'src/modules/users/enum/roles-user.enum'

export const UseRoles = (...roles: rolesUserEnum[]) => SetMetadata('roles', roles)

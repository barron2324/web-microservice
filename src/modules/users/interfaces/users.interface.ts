import rolesUserEnum from "../enum/roles-user.enum";

export interface usersInterface {
    userId: string;
    email: string;
    username: string;
    password: string;
    refreshToken?: string
    status: string
    roles?: rolesUserEnum
}
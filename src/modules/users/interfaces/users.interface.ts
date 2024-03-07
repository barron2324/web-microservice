import rolesUserEnum from "../enum/roles-user.enum";

export interface usersInterface {
    userId: string;
    email: string;
    username: string;
    password: string;
    status: string;
    roles?: rolesUserEnum;
    refreshToken?: string;
    latestLogin?: string;
    token?: string
}
export interface usersInterface {
    userId: string;
    email: string;
    username: string;
    password: string;
    fristname: string;
    lastname: string;
    status: string;
    roles?: string;
    refreshToken?: string;
    latestLogin?: string;
    token?: string
}
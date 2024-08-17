export interface UserObjectDt {
    username : string,
    email : string,
    password : string,
    fullname: string
}
export interface createUserQueryParams {
    loginAfterCreate ?: Boolean
}
export interface User {
    id?: string,
    fullname?: string ,
    username?: string,
    email?: string,
    message?: string
}
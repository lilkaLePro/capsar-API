export interface UserObjectDt {
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
    email?: string,
    message?: string,
    token?: string
}
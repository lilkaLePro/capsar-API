import crypto from 'crypto'

const SECRET = 'SECRET-KEY';
export const random = () => crypto.randomBytes(16).toString('hex');
export const authentication = (salt: string , password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(password).digest('hex')
};
// crypto.createHmac('sha256', salt).update(password).digest('hex');            
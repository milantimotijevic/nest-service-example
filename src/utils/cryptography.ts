import * as crypto from 'crypto';

export function createSalt(length: number) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export function hashPassword(password: string, salt: string) {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex');
}
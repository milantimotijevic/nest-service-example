
export type User = {
    email: string,
};

export type UserProfile = {
    firstName: string,
    lastName: string,
    age: number,
};

export type UserSecurityInfo = {
    salt: string,
    password: string,
}
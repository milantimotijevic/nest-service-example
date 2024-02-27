
export type UserParams = {
    email: string,
    profile: UserProfileParams,
    credentials: UserCredentialsParams,
};

export type UserProfileParams = {
    firstName: string,
    lastName: string,
    age: number,
};

export type UserCredentialsParams = {
    salt: string,
    password: string,
}
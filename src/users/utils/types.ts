
export type User = {
    email: string,
    profile: UserProfile,
    credentials: UserCredentials,
};

export type UserProfile = {
    firstName: string,
    lastName: string,
    age: number,
};

export type UserCredentials = {
    salt: string,
    password: string,
}
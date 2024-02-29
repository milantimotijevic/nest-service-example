
export type UserType = {
    username: string,
    salt: string,
    password: string,
    profile: UserProfileType,
};

export type UserProfileType = {
    firstName: string,
    lastName: string,
    age: number,
};
type User = {
    _id: string;
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export type UserRequest = Omit<User, '_id'>;
export type UserResponse = Omit<User, 'password'>
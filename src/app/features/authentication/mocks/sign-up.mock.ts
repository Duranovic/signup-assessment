import {UserRequest, UserResponse} from "../models/user.model";

export const userResponseMock: UserResponse = {
    _id: "123456789",
    firstName: "John",
    lastName: "Doe",
    email: "john-doe@mail.com"
};

export const userRequestMock: UserRequest = {
    firstName: "John",
    lastName: "Doe",
    email: "john-doe@mail.com",
    password: "StrongPassword123",
}
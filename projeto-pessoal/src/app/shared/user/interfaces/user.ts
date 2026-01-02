import { PersonRequest } from "../../person/interfaces/person";

export interface User {
    username: string,
    password: string,
    personId: string
}

export type userRequest = Omit<User, 'personId'>;
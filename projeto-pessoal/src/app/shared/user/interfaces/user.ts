import { PersonCreate } from "../../person/interfaces/person";

export interface User {
    username: string,
    password: string,
    personId: string
}
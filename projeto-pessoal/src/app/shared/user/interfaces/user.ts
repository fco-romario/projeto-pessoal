export interface User {
    id?: number,
    username: string,
    password: string,
    personId: string
}

export type userRequest = Omit<User, 'id' | 'personId'>;
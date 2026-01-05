import { Address } from "./address";

export interface Person {
    id: string;
    name: string;
    mathersName: string;
    gender: string;
    cpf: string;
    rg: string;
    phoneNumber: string;
    email: string;
    addresses?: Address[]
}

export type PersonRequest = Omit<Person, 'id' | 'mathersName' | 'gender' | 'cpf' | 'rg' | 'phoneNumber' | 'addresses'>;



export interface Person {
    id: string;
    name: string;
    mathersName: string;
    gender: string;
    cpf: string;
    rg: string;
    phoneNumber: string;
    email: string;
    adresses: []
}

export type PersonCreate = Omit<Person, 'id' | 'mathersName' | 'gender' | 'cpf' | 'rg' | 'phoneNumber' | 'adresses'>;



export interface Address {
    id?: string;
    cep: string;
    logradouro: string;
    bairro: string;
    numero: string;
    complemento?: string;
    personId?: string;
}

export type AddressRequest = Omit<Address, 'id'>
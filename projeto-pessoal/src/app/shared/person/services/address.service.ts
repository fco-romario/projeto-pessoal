import { inject, Injectable } from '@angular/core';
import { Address, AddressRequest } from '../interfaces/address';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly _baseUrl = "http://localhost:3000/addresses";
  
  private _http = inject(HttpClient);
  
  saveAddress(address: AddressRequest) {
    return this._http.post(this._baseUrl, address);
  }

  updateAddress(address: Address) {
    return this._http.put(`${this._baseUrl}/${address.id}`, address);
  }
  
}

import { Injectable } from '@angular/core';
import { Constants } from '../Helper/constants';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }
    // ...
    public isAuthenticated(): boolean {
        const user = JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');

        // const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return true;
    }
}

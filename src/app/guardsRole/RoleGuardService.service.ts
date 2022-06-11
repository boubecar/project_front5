// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import decode from 'jwt-decode';
import { Constants } from '../Helper/constants';
import { User } from '../Models/user';
import { AuthService } from '../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    debugger
    // this will be passed from the route config
    // on the data property
    let expectedRole = route.data['expectedRole'];
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');

    // decode the token to get its payload
    const tokenPayload = decode(user.token) || {};
    console.log('role', (<any>tokenPayload).role)
    if (
      !this.auth.isAuthenticated() ||
      (<any>tokenPayload).role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
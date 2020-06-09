import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MENU_ITEMS } from '../../pages/pages-menu';

@Injectable({
  providedIn: 'root',
})
export class RoleAssignService {
  constructor(private http: HttpClient) {}

  addRole(role: any) {
    return this.http.post(`${environment.server}/institute/role`, role).pipe(
      tap((res) => {}),
      catchError(this.handleError),
    );
  }

  getOtp(phone: any, params: any) {
    return this.http.get(`${environment.server}/users/sendOTP/${phone}`, { params: params }).pipe(
      tap((res: any) => {}),
      catchError(this.handleError),
    );
  }

  verifyOtp(params: any) {
    return this.http.get(environment.server + '/users/verifyOTP', { params: params }).pipe(
      tap((res) => {}),
      catchError((err) => this.handleError(err)),
    );
  }

  private handleError(error: any) {
    return throwError(error);
  }

  assignRoles(role: string) {
    if ((role && role === 'Teacher') || role === 'Counselor') {
      MENU_ITEMS[1].hidden = true;
      MENU_ITEMS[2].hidden = false;
      MENU_ITEMS[3].hidden = false;
      MENU_ITEMS[4].hidden = true;
      MENU_ITEMS[5].hidden = false;
      MENU_ITEMS[6].hidden = false;
      MENU_ITEMS[11].hidden = false;
      MENU_ITEMS[12].hidden = false;
      MENU_ITEMS[13].children[0].hidden = true;
      MENU_ITEMS[13].children[1].hidden = false;
      MENU_ITEMS[13].children[2].hidden = false;
    }
    if (role && role === 'institute') {
      MENU_ITEMS[1].hidden = true;
      MENU_ITEMS[2].hidden = false;
      MENU_ITEMS[3].hidden = false;
      MENU_ITEMS[4].hidden = false;
      MENU_ITEMS[5].hidden = false;
      MENU_ITEMS[6].hidden = false;
      // MENU_ITEMS[7].hidden = false;
      // MENU_ITEMS[8].hidden = false;
      // MENU_ITEMS[9].hidden = false;
      // MENU_ITEMS[10].hidden = false;
      MENU_ITEMS[11].hidden = false;
      MENU_ITEMS[12].hidden = false;
      MENU_ITEMS[13].hidden = false;
      MENU_ITEMS[13].children[0].hidden = false;
      MENU_ITEMS[13].children[1].hidden = false;
      MENU_ITEMS[13].children[2].hidden = false;
    } else if (role && role === 'Manager') {
      MENU_ITEMS[1].hidden = true;
      MENU_ITEMS[2].hidden = false;
      MENU_ITEMS[3].hidden = false;
      MENU_ITEMS[4].hidden = false;
      MENU_ITEMS[5].hidden = false;
      MENU_ITEMS[6].hidden = false;
      MENU_ITEMS[11].hidden = false;
      MENU_ITEMS[12].hidden = false;
      MENU_ITEMS[13].children[0].hidden = true;
      MENU_ITEMS[13].children[1].hidden = false;
      MENU_ITEMS[13].children[2].hidden = false;
    }
  }
}

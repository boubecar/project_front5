import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseCode } from '../enums/responseCode';
import { Constants } from '../Helper/constants';
import { ResponseModel } from '../Models/responseModel';
import { Role } from '../Models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  detFiliale: any = []
  backEndUrl: string = "https://localhost:44388/api/User";
  getRoleList(): Observable<any[]> {

    return this.http.get<any>(this.backEndUrl + '/GetRoles');
  }

  postRole(cumulative: any) {
    return this.http.post(this.backEndUrl + "/PostFilLocal", cumulative, { responseType: "text" })
  }

  deleteRole(cumulative: any) {
    return this.http.delete(this.backEndUrl + "/DeleteFilLocal?SaisieCommentId=" + cumulative, { responseType: "text" })
  }
  editRole(cumulative: any) {
    return this.http.put(this.backEndUrl + "/PutFilLocal", cumulative, { responseType: "text" })
  }
  public getAllRole() {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userInfo?.token}`
    });

    return this.http.get<ResponseModel>(Constants.BASE_URL + "user/GetRoles", { headers: headers }).pipe(map(res => {
      let roleList = new Array<Role>();
      if (res.responseCode == ResponseCode.OK) {
        if (res.dateSet) {
          res.dateSet.map((x: string) => {
            roleList.push(new Role(x));
          })
        }
      }
      return roleList;
    }));
  }
}

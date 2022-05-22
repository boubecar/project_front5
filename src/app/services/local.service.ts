import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Local } from '../local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) { }
  detFiliale: any = []
  backEndUrl: string = "https://localhost:44388/api/FiLocal";
  getLocalList(): Observable<any[]> {

    return this.http.get<any>(this.backEndUrl + '/GetAllFiLocal');
  }

  postLocal(cumulative: any) {
    return this.http.post(this.backEndUrl + "/PostFilLocal", cumulative, { responseType: "text" })
  }
  listNormes: Local[] = []

  deleteLocal(cumulative: any) {
    return this.http.delete(this.backEndUrl + "/DeleteFilLocal?SaisieCommentId=" + cumulative, { responseType: "text" })
  }
  editLocal(cumulative: any) {
    return this.http.put(this.backEndUrl + "/PutFilLocal", cumulative, { responseType: "text" })
  }
  GetAllLocalByFilale(cumulative: any) {
    return this.http.get(this.backEndUrl + "/GetLocalByfilialeId?id=" + cumulative,)
  }
  getlocal(cumulative: any) {
    return this.http.get(this.backEndUrl + "/" + cumulative,)
  }
}

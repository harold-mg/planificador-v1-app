import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DatosExcelService {
  private apiUrl = `${environment.apiUrl}/api/datos-excel`;
  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

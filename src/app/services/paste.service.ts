import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { readURL, writeURL } from '../shared/urls';
import { Paste } from '../shared/paste';

import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class PasteService {
  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) { }
  
  getPaste(id: string): Observable<string> {
    return this.http.get(readURL + id, { responseType: 'text' as 'text'})
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  putPaste(paste: Paste): Observable<Paste> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.put<Paste>(writeURL, paste, httpOptions)
      .pipe(catchError(this.processHttpMsgService.handleError));    
  }

}

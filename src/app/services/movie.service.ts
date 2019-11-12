import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  endpoint = 'https://us-central1-sunnysideapp2020.cloudfunctions.net/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvb3BhdGh5LjIxQGdtYWlsLmNvbSIsImV4cGVjdGVkQ29tcGxldGlvbkRhdGUiOiJNb24sIDExIE5vdiAyMDE5IDIxOjAwOjU4IEdNVCIsImlhdCI6MTU3MzQ5NDM1OCwiZXhwIjoxNTczNTA2MDU4fQ.AvYmPp0DI-TXtGJ4WY-l8knuK2dY_Vgci5pEEHCvLarMwptHDiSyzczhr8jFSFXs3G1dw21JUfEX7J5po-GsJRLgtdHzHX0PFBem34kmZUB922IFL818mi8f25zK6dNq2v3cHxgVwvGH-oFLwOYCDjzi5PtyE2aBltsfN7vz9EZp2sF__CgMxqu9zgMTF3O2xchPUjS4Rb0emSawPYqUeLJ-LCT2yBc_E2Th74_jFjj-whks4XTQwkCRhkMIASAVf8lLwqP1VVUXB1XBiUkOyuT4juAPFktldvgO6JFWefkPxvkSXhN8acjSLi6O9buLGHHrjv6wcHA5JDmoQi_diMU8AUP8P1A4WtB8_vd44vmIMX3itgEDM-RuHIfijLk5uzeGHwlfRgnwIcFgle_18T9NeGQaUDim5BFXdS41IU0RQLJR0hUwQMH2TOD1mHkmVQnqN5z9F00Nzi-uPmvjvBSHtn9cK_3BrjGwQME2cgG88lmm89_kh9a2JmjA-fv4FugOQvswLRTIVhgjZg2W4aMvGGJYHR1bJZd_IPUJTWD_LNOgWMSXUAnT4a7HCCvCaxgclqEOuzKsuhgcDJRzBrfleL9IX4XqyEBx_T-AKOq2aWzlhdiKUZFkyTiANkdvRQnDOIYDeAiDxx0WAxx7OhWv4nVHtr7qowLNRKvAA1Y'
    })
  };
  constructor(@Inject(HttpClient) private http: HttpClient) { }

  public getData(path): Observable<any> {
    return this.http.get(this.endpoint + path, this.httpOptions);
  }

  public postData(record, path) {
    return this.http.post<any>(this.endpoint + path,
      JSON.stringify(record), this.httpOptions).pipe(
      tap((challengeResponse) => {
        console.log(`Response from Server: ${JSON.stringify(challengeResponse)}`);
      }),
      catchError(this.handleError<any>('Post data'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any) => {
      console.error(`${operation} failed. Error: ${error.message}`);
      return throwError(error);
    };
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api-service';
import { DateAdapter } from '@angular/material';


@Injectable({
  providedIn: 'root'
})


export class SandboxApiService extends ApiService {

  constructor(protected http: HttpClient) {
    super(http);
  }

 


  //download the source file and insert batch into SQL database including:
  //new batchId, original filename and timestamps
  insertBatch(batchId: string, fileName: string, createdAt: string, submittedAt: string) : Observable<any>{

    let downloadUrl = "https://api.us.flatfile.io/batch/" + batchId + "/original-file";

    const apiURL = environment.webapi_url_base + 'batch';
    let data = Array({
      'batchId': batchId,
      'url': downloadUrl,
      'fileName': fileName,
      'created': createdAt,
      'submitted': submittedAt
    })

    return this.http.post<any>(apiURL, data);
  }

  insertBatchData(batchId: string, data: any) : Observable<any>{
    const apiURL = environment.webapi_url_base + 'batchData/' + batchId;
    return this.http.post<any>(apiURL, data);
  }

  
  getHCPCSCodes(fileType: string) : Observable<any>{

    return this.http.get('http://localhost:59936/api/codes/hcpcs/' +  fileType);
   
  } 

  getRevCodes(fileId: number):Observable<any> {
  
    return this.http.get('http://localhost:59936/api/codes/rev/' +  fileId);

  }

   getHCPCSFiles():Observable<any>{
    return this.http.get('http://localhost:59936/api/files');
  } 

}

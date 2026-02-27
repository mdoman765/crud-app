import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UploadResponse {
  url: string;
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/upload`;

  // Upload with progress tracking
  upload(file: File): Observable<HttpEvent<UploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.request<UploadResponse>(
      new HttpRequest('POST', this.api, formData, {
        reportProgress: true
      })
    );
  }

  // Delete file from server
  deleteByFileName(fileName: string): Observable<void> {
    return this.http.delete<void>(`${this.api}?fileName=${fileName}`);
  }
}
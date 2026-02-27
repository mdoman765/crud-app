import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, CreateProduct, UpdateProduct } from '../../core/models/product.model';



@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/products`;

  getAll(search?: string, category?: string, isActive?: boolean): Observable<Product[]> {
    let params = new HttpParams();
    if (search)                  params = params.set('search',   search);
    if (category)                params = params.set('category', category);
    if (isActive !== undefined)  params = params.set('isActive', String(isActive));
    return this.http.get<Product[]>(this.api, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/categories`);
  }

  create(dto: CreateProduct): Observable<Product> {
    return this.http.post<Product>(this.api, dto);
  }

  update(id: number, dto: UpdateProduct): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
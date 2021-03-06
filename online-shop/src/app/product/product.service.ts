import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IComment, IProduct } from '../shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class ProductService {

  currentProduct: IProduct;

  constructor(private http: HttpClient) { }

  loadProductsList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/products`);
  }

  loadProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`).pipe(
      tap((product: IProduct) => this.currentProduct = product)
    );
  }

  saveProduct(data: { productName: string, description: string, price: number, imageUrl: string }): Observable<IProduct> {
    return this.http.post<IProduct>(`/products`, data).pipe(
      tap((product: IProduct) => this.currentProduct = product)
    );
  }

  editProduct(data: { productName: string, description: string, price: number, imageUrl: string }, id: string): Observable<IProduct> {
    return this.http.put<IProduct>(`/products/${id}`, data).pipe(
      tap((product: IProduct) => this.currentProduct = product)
    );
  }

  deleteProduct(id: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`/products/${id}`);
  }

  buyProduct(id: string): Observable<any> {
    return this.http.post<any>(`/products/${id}`, {});
  }

  addComment(data: { text: string }, id: string): Observable<IProduct> {
    return this.http.post<IProduct>(`/products/comment/${id}`, data).pipe(
      tap((product: IProduct) => this.currentProduct = product)
    );
  }

  deleteComment(commentId: string, productId: string): Observable<IComment> {
    return this.http.delete<IComment>(`/products/${productId}/comment/${commentId}`);
  }

  likeComment(commentId: string): Observable<any> {
    return this.http.put<any>(`/likes/${commentId}`, {});
  }

  editComment(data: { text: string }, productId: string, commentId: string): Observable<IComment> {
    return this.http.put<IComment>(`/products/${productId}/comment/${commentId}`, data);
  }
}

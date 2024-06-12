import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CatalogElement {
    id: number;
    parent_id: number;
    parent_title: string | null;
    catalog_title: string;
    description: string;
}

export interface CatalogData {
    id: number;
    parent_id: number | null;
    title: string;
    description: string;
}


interface ApiResponse {
    recordsTotal: number;
    data: CatalogElement[];
}

@Injectable({
    providedIn: 'root'
})
export class CatalogServices {
    private apiUrl = 'https://localhost:44317/Catalog';  // Thay thế bằng URL API của bạn

    constructor(private http: HttpClient) { }

    getParentElements(): Observable<{ total: number, data: CatalogElement[] }> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/Get_All_Parent_Catalog`).pipe(
            map(response => ({
                total: response.recordsTotal,
                data: response.data
            }))
        );
    }

    getElements(offset: number, limit: number, search: string): Observable<{ total: number, data: CatalogElement[] }> {
        let params = new HttpParams()
            .set('offset', offset.toString())
            .set('limit', limit.toString())
            .set('search', search);

        return this.http.get<ApiResponse>(`${this.apiUrl}/Get_All`, { params }).pipe(
            map(response => ({
                total: response.recordsTotal,
                data: response.data
            }))
        );
    }

    modifiedCatalog(catalog: CatalogData): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/Update`, catalog);
    }
}

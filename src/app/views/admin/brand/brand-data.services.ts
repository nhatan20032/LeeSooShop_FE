import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BrandElement {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    created_at: string | null;
}


interface ApiResponse {
    recordsTotal: number;
    data: BrandElement[];
}

@Injectable({
    providedIn: 'root'
})
export class BrandServices {
    private apiUrl = 'https://localhost:44317/Brand';

    constructor(private http: HttpClient) { }

    getElements(offset: number, limit: number, search: string): Observable<{ total: number, data: BrandElement[] }> {
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

    modifiedBrand(catalog: BrandElement): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/Update`, catalog);
    }

    createdBrand(catalog: BrandElement): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/Create`, catalog);
    }

    deleteBrand(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/Delete/${id}`);
    }
}

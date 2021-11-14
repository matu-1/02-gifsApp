import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGitsResponse, Gifs } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey = '3O46PIXsNzkaMgtXDmGqplH9oO19svRB';
  private apiUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  results?: Gifs[];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  get historial() {
    return [...this._historial];
  }

  agregarBusqueda(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = {
      api_key: this.apiKey,
      q: query,
      limit: 10,
    };
    this.http
      .get<SearchGitsResponse>(`${this.apiUrl}/search`, { params })
      .subscribe((res) => {
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(res.data));
      });
  }
}

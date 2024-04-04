import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getForecast(location: string) {
    const url = `https://api.weather.gov/gridpoints/${location}/31,80/forecast`;
    return this.http.get(url);
  }
}

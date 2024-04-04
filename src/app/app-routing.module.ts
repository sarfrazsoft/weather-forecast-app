import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

const routes: Routes = [
  { path: 'weather/:location', component: WeatherChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

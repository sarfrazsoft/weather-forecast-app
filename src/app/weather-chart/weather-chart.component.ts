import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnInit {
  chart: any;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const location = params['location'];
      this.weatherService.getForecast(location).subscribe((data: any) => {
        const temperatures = data.properties.periods.map((period: any) => period.temperature);
        this.renderChart(temperatures);
      });
    });
  }

  renderChart(temperatures: number[]) {
    const ctx = document.getElementById('weatherChart') as HTMLCanvasElement;
    if (!ctx) {
      return;
    }

    // Destroy previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx.getContext('2d')!, {
      type: 'line',
      data: {
        labels: temperatures.map((temp, index) => `Day ${index + 1}`),
        datasets: [{
          label: 'Temperature',
          data: temperatures,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'x',
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}

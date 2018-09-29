import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import { WorkloadDataService } from '../../../../workload-data.service';
import {Workload} from '../../../../model/workload';
import {Observable} from 'rxjs/index';
import { Chart } from 'chart.js';
import {map} from 'rxjs/internal/operators';

@Component({
    selector: 'app-mixed-chart',
    templateUrl: './mixed-chart.component.html',
    styleUrls: ['./mixed-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MixedChartComponent implements OnInit {

    public charts: Chart[] = [];

    // bar chart
    public mixedChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            position: 'bottom'
        },
        scales: {
            barBeginAtOrigin: true,
            scaleBeginAtZero: true,
            xAxes: [{
                type: 'time',
                // distribution: 'linear', // explore
                time: {
                    unit: 'hour',
                    // unitStepSize: 1,
                    displayFormats: { hour: 'HH:mm'}
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    fontColor: 'rgb(181,182,187)'
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgba(181,182,187,0.2)'
                },
                ticks: {
                    fontColor: 'rgb(181,182,187)'
                }
            }]
        }
    };

    // default chart type has to be 'bar'
    public mixedChartType = 'bar';
    public mixedChartLegend = true;

    public mixedChartColors: Array<any> = [
        {
            // bar: light blue
            backgroundColor: 'rgba(26,177,191,0.7)',
            borderColor: 'rgba(26,177,191,1)'
        },
        {
            // line: grey
            borderColor: 'rgba(105,108,117,1)',
            pointBackgroundColor: 'rgba(42,45,59,0.2)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(42,45,59,0.5)'
        },
        {
            // line: white
            borderColor: 'rgba(105,108,117,1)',
        }
    ];

    private barChartData: any[] = [];
    private lineChartData: any[] = [];

    public mixedChartData: any[] = [];

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.mixedChartData));
        clone[0].data = data;
        this.mixedChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private workloadService: WorkloadDataService ) {}

    ngOnInit() {
        this.workloadService.getInitialWorkloadData().subscribe( data => {
            console.log('Source data: ', data);

            const todayData = data.today.map((item) => {
                return {x: new Date(item.x), y: item.y };
            });

            const historicalData = data.historical.map((item) => {
                return {x: new Date(item.x), y: item.y };
            });

            let incomingWorkloadChart = {
                type: 'bar',
                data: {
                    // labels: chartLabels,
                    datasets: [
                        {
                            // bar: light blue
                            type: 'bar',
                            label: 'Today',
                            data: todayData,
                            backgroundColor: 'rgba(26,177,191,0.7)',
                            borderColor: 'rgba(26,177,191,1)'
                            // borderWidth: 1
                        },
                        {
                            type: 'line',
                            label: 'Historical',
                            data: historicalData,
                            lineTension: 0,
                            fill: false,
                            borderColor: 'rgba(105,108,117,1)',
                            pointBackgroundColor: 'rgba(42,45,59,0.2)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(42,45,59,0.5)'
                        }
                    ]
                },
                options: this.mixedChartOptions
            };
            this.charts.push(new Chart('canvas', incomingWorkloadChart));
        });
    }

    initBarChartData() {
        this.workloadService.getInitialWorkloadData().subscribe(
            (data: any[]) => {
                console.log('Data from observable: ', data);
                data.forEach(item => {
                    this.barChartData.push({ x: new Date(item.x), y: item.y });
                });
            },
            error => { console.log('Error: ', error); }
        );
    }

    addBarChart(chartLabels: any[], chartData: any[]) {
        console.log('Initializing bar chart: ', chartData);

        this.charts.push(
            new Chart('canvas', {
                type: 'bar',
                label: 'Bar',
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            data: chartData,
                            backgroundColor: 'rgba(77,83,96,0.7)',
                            borderColor: 'rgba(77,83,96,1)'
                        }
                    ]
                },
                options: this.mixedChartOptions
            })
        );
    }

    addLineChart(chartLabels: any[], chartData: any[]) {
        this.charts.push(
            new Chart('canvas', {
                type: 'line',
                label: 'Line',
                fill: false,
                lineTension: 0,
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            data: chartData,
                            borderColor: 'rgba(105,108,117,1)',
                            pointBackgroundColor: 'rgba(42,45,59,0.2)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(42,45,59,0.5)'
                        }
                    ]
                },
                options: this.mixedChartOptions
            })
        );
    }

    addVerticalLine() {
        this.mixedChartData.push({
            label: 'Now',
            type: 'line',
            fill: false,
            lineTension: 0,
            borderDash: [10, 5],
            data: [
                { x: new Date('2018-09-11T13:00:00-0400'), y: 0 },
                { x: new Date('2018-09-11T13:00:00-0400'), y: 100 }
            ]
        });
    }
}

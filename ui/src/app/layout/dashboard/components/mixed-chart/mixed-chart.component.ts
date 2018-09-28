import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import { WorkloadDataService } from '../../../../workload-data.service';
import {Workload} from '../../../../model/workload';
import {Observable} from 'rxjs/index';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-mixed-chart',
    templateUrl: './mixed-chart.component.html',
    styleUrls: ['./mixed-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MixedChartComponent implements OnInit {

    public charts: Chart = {};

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
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
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

    constructor(private workloadService: WorkloadDataService ) {
/*        this.workloadService.getInitialWorkloadData().subscribe((res: any[]) => {
            res.forEach(item => {
                this.barChartData.push(new Workload(item.x, item.y));
            });
        });*/
        // this.fetchBarChartData();
        // this.initBarChartData();
        // this.addBarChart(this.barChartData);
        // this.addLineChart(this.getLineChartData());
        // this.addVerticalLine();
    }

    ngOnInit() {
        this.workloadService.getInitialWorkloadData().subscribe( data => {
            console.log(data);

            // const workloadDates = data.map((item) => new Date(item.x));
            // const workloadValues = data.map((item) => item.y);
            // this.addBarChart(workloadDates, workloadValues);

            // const historicalDates = this.getLineChartData().map((item) => new Date(item.x));
            // const historicalValues = this.getLineChartData().map((item) => item.y);
            // this.addLineChart(historicalDates, historicalValues);

            const workloadDates = data.map((item) => {
                return {x: new Date(item.x), y: item.y };
            });

            let incomingWorkloadChart = {
                type: 'bar',
                data: {
                    // labels: chartLabels,
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Bar',
                            data: workloadDates,
                            backgroundColor: 'rgba(77,83,96,0.7)',
                            borderColor: 'rgba(77,83,96,1)',
                            borderWidth: 1
                        },
                        {
                            type: 'line',
                            label: 'Line',
                            data: this.getLineChartData(),
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



    buildLineChart(chartLabels: any[], chartData: any[]) {

    }

/*    fetchBarChartData() {
        this.workloadService.getInitialWorkloadData()
            .toPromise()
            .then((data) => {
                console.log('promise1:', data);
                data.forEach(item => {
                    console.log(item.x, ', ', item.y);
                    this.barChartData.push({ x: new Date(item.x), y: 65 });
                });
            })
            .then((data) => {
                console.log('promise 2', this.barChartData);
                this.addBarChart(this.barChartData);

            });
    }*/

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

    getBarChartData(): any[] {
        return [
            { x: new Date('2018-09-11T01:00:00-0400'), y: 65 },
            { x: new Date('2018-09-11T02:00:00-0400'), y: 59 },
            { x: new Date('2018-09-11T03:00:00-0400'), y: 80 },
            { x: new Date('2018-09-11T04:00:00-0400'), y: 81 },
            { x: new Date('2018-09-11T05:00:00-0400'), y: 56 },
            { x: new Date('2018-09-11T06:00:00-0400'), y: 55 },
            { x: new Date('2018-09-11T07:00:00-0400'), y: 40 },
            { x: new Date('2018-09-11T08:00:00-0400'), y: 15 },
            { x: new Date('2018-09-11T09:00:00-0400'), y: 80 },
            { x: new Date('2018-09-11T10:00:00-0400'), y: 90 },
            { x: new Date('2018-09-11T11:00:00-0400'), y: 34 },
            { x: new Date('2018-09-11T12:00:00-0400'), y: 2 },
            { x: new Date('2018-09-11T13:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T14:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T15:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T16:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T17:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T18:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T19:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T20:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T21:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T22:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T23:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T24:00:00-0400'), y: 0 }
        ];
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

    getLineChartData(): any[] {
        return [
            { x: new Date('2018-09-11T01:00:00-0400'), y: 28 },
            { x: new Date('2018-09-11T02:00:00-0400'), y: 48 },
            { x: new Date('2018-09-11T03:00:00-0400'), y: 40 },
            { x: new Date('2018-09-11T04:00:00-0400'), y: 19 },
            { x: new Date('2018-09-11T05:00:00-0400'), y: 86 },
            { x: new Date('2018-09-11T06:00:00-0400'), y: 27 },
            { x: new Date('2018-09-11T07:00:00-0400'), y: 90 },
            { x: new Date('2018-09-11T08:00:00-0400'), y: 40 },
            { x: new Date('2018-09-11T09:00:00-0400'), y: 25 },
            { x: new Date('2018-09-11T10:00:00-0400'), y: 82 },
            { x: new Date('2018-09-11T11:00:00-0400'), y: 85 },
            { x: new Date('2018-09-11T12:00:00-0400'), y: 59 },
            { x: new Date('2018-09-11T13:00:00-0400'), y: 65 },
            { x: new Date('2018-09-11T14:00:00-0400'), y: 49 },
            { x: new Date('2018-09-11T15:00:00-0400'), y: 35 },
            { x: new Date('2018-09-11T16:00:00-0400'), y: 20 },
            { x: new Date('2018-09-11T17:00:00-0400'), y: 10 },
            { x: new Date('2018-09-11T18:00:00-0400'), y: 8 },
            { x: new Date('2018-09-11T19:00:00-0400'), y: 2 },
            { x: new Date('2018-09-11T20:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T21:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T22:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T23:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T24:00:00-0400'), y: 0 }
        ];
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

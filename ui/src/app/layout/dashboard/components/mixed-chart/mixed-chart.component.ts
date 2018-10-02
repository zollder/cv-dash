import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

import {WorkloadDataService} from '../../../../workload-data.service';
import {interval, Observable} from 'rxjs/index';
import {Chart} from 'chart.js';
import {startWith, switchMap} from 'rxjs/internal/operators';

@Component({
    selector: 'app-mixed-chart',
    templateUrl: './mixed-chart.component.html',
    styleUrls: ['./mixed-chart.component.scss']
})
export class MixedChartComponent implements OnInit, OnDestroy {

    // bar chart
    public chartOptions: any = {
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
        }
/*        {
            // line: white
            borderColor: 'rgba(105,108,117,1)',
        }*/
    ];

    public mixedChartData: any[] = [
        {
            label: 'Today',
            type: 'bar',
            data: []
        },
        {
            label: 'Historical',
            type: 'line',
            fill: false,
            lineTension: 0,
            data: []
        }
    ];
    public workloadObservable: Observable<any>;
    public subscriber;

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor(private workloadService: WorkloadDataService ) {
        this.workloadObservable = this.workloadService.getInitialWorkloadData();
    }

    ngOnInit() {
        this.subscriber = interval(10000).pipe(
            startWith(0),
            switchMap(() => this.workloadObservable))
            .subscribe(data => {
                // console.log('Incoming data', data);
                this.mixedChartData = [
                    {
                        label: 'Today',
                        type: 'bar',
                        data: data.today.map((item) => {
                            return {x: new Date(item.x), y: item.y};
                        })
                    },
                    {
                        label: 'Historical',
                        type: 'line',
                        fill: false,
                        lineTension: 0,
                        data: data.historical.map((item) => {
                            return {x: new Date(item.x), y: item.y};
                        })
                    }
                ];
            });
    }

    ngOnDestroy(): void {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }
/*    ngOnInit() {
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
    }*/

/*    addVerticalLine() {
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
    }*/
}

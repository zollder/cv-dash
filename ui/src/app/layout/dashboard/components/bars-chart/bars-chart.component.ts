import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { WorkloadDataService } from '../../../../workload-data.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { interval } from 'rxjs/index';
import {startWith, switchMap} from 'rxjs/internal/operators';

@Component({
    selector: 'app-bars-chart',
    templateUrl: './bars-chart.component.html',
    styleUrls: ['./bars-chart.component.scss']
})
export class BarsChartComponent implements OnInit, OnDestroy {

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
                time: {
                    unit: 'hour',
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

    public chartType = 'bar';
    public chartLegend = true;
    public chartColors: Array<any> = [
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.7)',
            borderColor: 'rgba(77,83,96,1)'
        },
        {
            // blue
            backgroundColor: 'rgba(26,177,191,0.7)',
            borderColor: 'rgba(26,177,191,1)'
        }
    ];

    public chartData: any[] = [
        {
            label: 'Historical',
            type: 'bar',
            data: []
        },
        {
            label: 'Today',
            type: 'bar',
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
        // console.log(e);
    }

    constructor(private workloadService: WorkloadDataService) {
        this.workloadObservable = this.workloadService.getInitialWorkloadData();
    }

    ngOnInit() {
        this.subscriber = interval(10000).pipe(
            startWith(0),
            switchMap(() => this.workloadObservable))
            .subscribe(data => {
                console.log('Incoming data', data);
                console.log('Incoming historical data', data[0]);

                // let workloadValues = data.today.map((item) => item.y);
                let historical = data.historical.map((item) => {
                    return {x: new Date(item.x), y: item.y};
                });
                let today = data.today.map((item) => {
                    return {x: new Date(item.x), y: item.y};
                });
                console.log('Modified historical data', historical);
                this.chartData = [
                    {
                        label: 'Historical',
                        type: 'bar',
                        data: historical
                    },
                    {
                        label: 'Today',
                        type: 'bar',
                        data: today
                    },
                ];
            });
        // this.workloadObservable.subscribe();
    }

    ngOnDestroy(): void {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }
}

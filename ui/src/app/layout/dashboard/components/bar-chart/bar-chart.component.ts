import {Component, Input, OnInit} from '@angular/core';
import {WorkloadDataService} from '../../../../workload-data.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

    chart = [];

    // bar chart
    public barChartOptions: any = {
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

    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartColors: Array<any> = [
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.7)',
            borderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,1)',
            borderColor: 'rgba(148,159,177,0.7)'
        }
    ];

    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartData: any[] = [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Series A'
        },
        {
            data: [28, 48, 40, 19, 86, 27, 90],
            label: 'Series B'
        }
    ];

    // ----------------- new fields
    public chartLabels = [];
    public chartData: any[] = [];

    // events
    public chartClicked(e: any): void {
        console.log(e);
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
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private workloadService: WorkloadDataService) {}

    ngOnInit() {
        this.workloadService.getInitialWorkloadData().subscribe( data => {
            console.log(data);

            let workloadValues = data.today.map((item) => item.y);
            let workloadDates = data.today.map((item) => new Date(item.x));

            this.chart.push(
                new Chart('canvas1', {
                    type: 'bar',
                    data: {
                        labels: workloadDates,
                        datasets: [
                            {
                                data: workloadValues,
                                backgroundColor: 'rgba(77,83,96,0.7)',
                                borderColor: 'rgba(77,83,96,1)'
                            }
                        ]
                    },
                    options: this.barChartOptions
                })
            );
        });
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mixed-chart',
    templateUrl: './mixed-chart.component.html',
    styleUrls: ['./mixed-chart.component.scss']
})
export class MixedChartComponent implements OnInit {
    // bar chart
    public mixedChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            position: 'bottom'
        },
        layout: {
            // padding: {
            //     left: 50,
            //     right: 0,
            //     top: 0,
            //     bottom: 0
            // }
            // backgroundColor: 'rgba(42,45,59,1)'
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

    public mixedChartData: any[] = [{
        label: 'Bar',
        type: 'bar',
        // lineTension: 0,
        data: [
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
            { x: new Date('2018-09-11T24:00:00-0400'), y: 0 },

        ]
    }, {
        label: 'Line',
        type: 'line',
        fill: false,
        lineTension: 0,
        data: [
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
            { x: new Date('2018-09-11T24:00:00-0400'), y: 0 },
        ]
    }, {
        label: 'Now',
        type: 'line',
        fill: false,
        lineTension: 0,
        borderDash: [10, 5],
        data: [
            { x: new Date('2018-09-11T13:00:00-0400'), y: 0 },
            { x: new Date('2018-09-11T13:00:00-0400'), y: 100 }
        ]
    }];

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

    constructor() {}

    ngOnInit() {}
}

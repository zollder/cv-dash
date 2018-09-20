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
        // elements: {
        //     line: {
        //         tension: 0
        //     }
        // },
        scales: {
            xAxes: [{
                type: 'time',
                // distribution: 'linear', // explore
                time: {
                    unit: 'hour',
                    // unitStepSize: 1,
                    displayFormats: { hour: 'HH:mm'}
                },
                // ticks: {
                //     source: 'data'
                // },
                // bounds: 'data' // data is fully visible, labels outside removed
            }]
        }
    };

    // default chart type has to be 'bar'
    public mixedChartType = 'bar';
    public mixedChartLegend = true;

    public mixedChartData: any[] = [{
        label: 'Line',
        type: 'line',
        fill: false,
        lineTension: 0,
        data: [
            { x: new Date('2018-09-11T12:00:00-0400'), y: 2 },
            { x: new Date('2018-09-11T11:00:00-0400'), y: 34 },
            { x: new Date('2018-09-11T10:00:00-0400'), y: 90 },
            { x: new Date('2018-09-11T09:00:00-0400'), y: 80 },
            { x: new Date('2018-09-11T08:00:00-0400'), y: 15 },
            { x: new Date('2018-09-11T07:00:00-0400'), y: 40 },
            { x: new Date('2018-09-11T06:00:00-0400'), y: 55 },
            { x: new Date('2018-09-11T05:00:00-0400'), y: 56 },
            { x: new Date('2018-09-11T04:00:00-0400'), y: 81 },
            { x: new Date('2018-09-11T03:00:00-0400'), y: 80 },
            { x: new Date('2018-09-11T02:00:00-0400'), y: 59 },
            { x: new Date('2018-09-11T01:00:00-0400'), y: 65 }
        ]
    }, {
        label: 'Bar',
        type: 'bar',
        lineTension: 0.25,
        data: [
            { x: new Date('2018-09-11T12:00:00-0400'), y: 59 },
            { x: new Date('2018-09-11T11:00:00-0400'), y: 85 },
            { x: new Date('2018-09-11T10:00:00-0400'), y: 82 },
            { x: new Date('2018-09-11T09:00:00-0400'), y: 25 },
            { x: new Date('2018-09-11T08:00:00-0400'), y: 40 },
            { x: new Date('2018-09-11T07:00:00-0400'), y: 90 },
            { x: new Date('2018-09-11T06:00:00-0400'), y: 27 },
            { x: new Date('2018-09-11T05:00:00-0400'), y: 86 },
            { x: new Date('2018-09-11T04:00:00-0400'), y: 19 },
            { x: new Date('2018-09-11T03:00:00-0400'), y: 40 },
            { x: new Date('2018-09-11T02:00:00-0400'), y: 48 },
            { x: new Date('2018-09-11T01:00:00-0400'), y: 28 }
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

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
        responsive: true
    };
    public mixedChartLabels: string[] = [
        '00',
        '02',
        '04',
        '06',
        '08',
        '10',
        '12',
        '14',
        '16',
        '18',
        '20',
        '22',
        '24'
    ];
    // default chart type has to be 'bar'
    public mixedChartType: string = 'bar';
    public mixedChartLegend: boolean = true;

    public mixedChartData: any[] = [{
        data: [65, 59, 80, 81, 56, 55, 40, 15, 80, 90],
        label: 'Line',
        type: 'line',
        fill: false
    }, {
        label: 'Bar',
        type: 'bar',
        data: [28, 48, 40, 19, 86, 27, 90, 40, 25, 82]
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

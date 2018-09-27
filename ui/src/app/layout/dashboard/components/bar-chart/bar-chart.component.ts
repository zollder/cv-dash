import {Component, Input, OnInit} from '@angular/core';
import {WorkloadDataService} from "../../../../workload-data.service";

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
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
    public chartLabels: Date[] = [];
    public chartData: number[] = [];
    @Input() workloadData = {
        '2018-09-11T01:00:00-0400': 65,
        '2018-09-11T02:00:00-0400': 59,
        '2018-09-11T03:00:00-0400': 80,
        '2018-09-11T04:00:00-0400': 81,
        '2018-09-11T05:00:00-0400': 56,
        '2018-09-11T06:00:00-0400': 55,
        '2018-09-11T07:00:00-0400': 40
    };

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

    public getData() {
        this.chartLabels = Object.keys(this.workloadData).map(key => new Date(key));
        this.chartData = Object.values(this.workloadData);
        console.log('Labels:', this.chartLabels);
        console.log('Data:', this.chartData);
    }

    ngOnInit() {
        this.getData();
    }
}

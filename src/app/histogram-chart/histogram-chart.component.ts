import {Component, Input, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import ChartComponent from '../../assets/ChartData.json';

@Component({
  selector: 'app-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.css']
})
export class HistogramChartComponent implements OnInit {
  chart: am4charts.XYChart;
  @Input() data: any;
  setting: any;
  key: any;

  constructor() {
  }

  ngOnInit() {
    this.chart = am4core.create(this.setting.statName, am4charts.XYChart);
    this.data = ChartComponent;
    console.log(this.data);

  }


}

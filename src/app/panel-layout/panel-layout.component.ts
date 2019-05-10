import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.css']
})
export class PanelLayoutComponent implements OnInit, AfterViewInit {
  data: any;
  // @Input() setting: any;
  // @Input() key: string;
  rawData: any = [];
  hisData: Array<any> = [];
  Chart: am4charts.XYChart;
  statID: string;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }
}

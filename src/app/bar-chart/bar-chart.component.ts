import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: any;
  setting: any;
  key: any;

  stack = false;
  Chart: am4charts.XYChart;
  chartData: any = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.Chart) {
      this.Chart.dispose();
    }
  }

  ngAfterViewInit(): void {
    console.log(this.setting);
    this.key = Object.keys(this.data[0]);
    console.log(this.key);
    let yFullName: string;
    let chartColor: string;

    console.log(this.data);
    console.log(this.setting);
    console.log(this.setting.statName);

    this.Chart = am4core.create(this.setting.statName, am4charts.XYChart);

    let chart: am4charts.XYChart;
    chart = this.Chart;
    chart.percentWidth = 90;
    chart.align = 'center';
    chart.scrollbarX = new am4core.Scrollbar();
    chart.align = 'center';
    chart.responsive.enabled = true;
    chart.fontFamily = 'Calibri, serif';
    chart.fontWeight = 'lighter';
    let i = 0;
    // this.chartData = [...this.data];
    this.chartData = this.data;

    this.chartData.sort((a, b) => a[this.key[1]] - b[this.key[1]]);

    chart.data = this.chartData;

    console.log(chart.data);
    yFullName = this.setting.statName;
    chartColor = this.setting.statColor;

// Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = this.key[0];
    console.log(this.key);
    categoryAxis.fontSize = '20px';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = '20px';

    const topContainer = chart.chartContainer.createChild(am4core.Container);
    topContainer.layout = 'absolute';
    topContainer.toBack();
    topContainer.paddingBottom = 15;
    topContainer.width = am4core.percent(100);

    const Title = topContainer.createChild(am4core.Label);
    Title.text = yFullName;
    Title.fontSize = '40px';
    Title.fontWeight = '600';
    Title.align = 'center';
    Title.paddingBottom = 60;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = this.key[1];
    series.dataFields.categoryX = this.key[0];
    // series.fontSize = '50px';
    series.name = yFullName;
    series.fill = am4core.color(chartColor);
    // series.yAxis =
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.fillOpacity = .8;

    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = .5;
    columnTemplate.width = am4core.percent(100);

    // on hover, make corner radiuses bigger
    const hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
  }

}

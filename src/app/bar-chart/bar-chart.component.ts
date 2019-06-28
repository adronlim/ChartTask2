import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ServicesService} from '../services.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: any;
  setting: any;
  key: any;
  settingKeys: any;
  chartId: any;
  index: number;
  showError: boolean;
  // stack = false;
  Chart: am4charts.XYChart;
  chartData: any = [];

  constructor(private Service: ServicesService) {
    this.chartId = ServicesService.getChartId(1111111, 9999999).toString();

  }
  ngOnInit() {
    console.log(this.data);
    this.key = Object.keys(this.data[0]);
    console.log(this.chartId);
    if (this.key.length <= 3) {
      console.log(this.index);
      if (this.index == 2) {
        console.log(this.data);
        console.log(this.key[this.key.length - 1]);

        this.data = this.Service.histogramData(this.data, this.key[this.key.length - 1]);   // return histogram data only (1 Dimensional Array)
        this.setting = this.Service.histogramSetting(this.data, this.setting, this.key[this.key.length - 1]);
        console.log(this.setting);
      }
      this.showError = false;

    } else {
      this.showError = true;

    }

  }
  ngOnDestroy() {
    if (this.Chart) {
      this.Chart.dispose();
    }
  }
  ngAfterViewInit(): void {


    if (this.key.length <= 3) {
      this.key = Object.keys(this.data[0]);
      this.settingKeys = Object.keys(this.setting);
      console.log(this.setting);
      console.log(this.data);
      console.log(this.key);
      let yFullName: string;
      let chartColor: string;

      console.log(this.data);
      console.log(this.setting);
      // console.log(this.setting.statName);
      console.log(this.setting[this.settingKeys[1]]);
      console.log(this.settingKeys);
      console.log(this.chartId);
      this.Chart = am4core.create(this.chartId, am4charts.XYChart);

      let chart: am4charts.XYChart;
      chart = this.Chart;
      chart.percentWidth = 90;
      chart.align = 'center';
      chart.scrollbarX = new am4core.Scrollbar();
      chart.align = 'center';
      chart.responsive.enabled = true;
      chart.fontFamily = 'Calibri, serif';
      chart.fontWeight = 'lighter';
      this.chartData = [...this.data];
      chart.data = this.chartData;
      console.log(chart.data);
      yFullName = this.setting[this.settingKeys[1]];
      chartColor = this.setting.statColor;
      console.log(this.setting.statColor);
// Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.key[this.key.length - 2];
      console.log(this.key);
      categoryAxis.fontSize = '20px';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = 'right';
      categoryAxis.renderer.labels.template.verticalCenter = 'middle';
      if (this.settingKeys[0] == 'hisID') {
        categoryAxis.renderer.labels.template.rotation = 0;
      } else {
        categoryAxis.renderer.labels.template.rotation = 270;
      }
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
      series.dataFields.valueY = this.key[this.key.length - 1];
      console.log(this.key[this.key.length - 1]);
      series.dataFields.categoryX = this.key[this.key.length - 2];
      console.log(this.key[this.key.length - 2]);
      // series.fontSize = '50px';
      series.name = yFullName;
      console.log(yFullName);
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
    } else {
      if (this.Chart) {
        this.Chart.dispose();
      }
    }
  }
}

import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ServicesService} from '../services.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() data: any;
  // @Output() Error = new EventEmitter();
  setting: any;
  key: any;
  settingKeys: any;
  chartId: string;
  index: number;
  chartName: string;
  // showError: boolean;
  // stack = false;
  Chart: am4charts.XYChart;
  chartData: any;

  // @ViewChild('E1') chartE: ElementRef;

  constructor(private Service: ServicesService) {
    this.chartData = [];
  }
  ngOnInit() {
    ServicesService.getChartId(1111111, 9999999).subscribe(id => {
      this.chartId = id;
    });

    console.log(this.data);
    this.key = Object.keys(this.data[0]);
    console.log(this.chartId);
    console.log('this.chartId :\n' + this.chartId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('%cinput changed!!!!!!!!!! BARCHARTCOMPONENT', 'background: #222; color: #bada55');
    console.log(changes);
  }

  ngOnDestroy() {
    console.log('OnDestroy\nthis.chartId :\n' + this.chartId);
    if (this.Chart) {
      console.log(true);
      this.Chart.disposeChildren();
      this.Chart.dispose();
    }
    // delete this.Chart;

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chartName = 'Bar Chart';
    });
    if (this.key.length <= 3) {
      console.log(this.data);
      console.log(this.key.length);
      console.log(this.index);
      if (this.index == 2) {
        console.log(this.data);
        console.log(this.key[this.key.length - 1]);
        console.log(this.chartId);

        this.data = this.Service.histogramData(this.data, this.key[this.key.length - 1]);   // return histogram data only (1 Dimensional Array)
        this.setting = this.Service.histogramSetting(this.data, this.setting, this.key[this.key.length - 1]);
        console.log(this.setting);
        setTimeout(() => {
          this.chartName = 'Histogram Chart';
        });
      }
      console.log('this.chartId :\n' + this.chartId);

      console.log('ngAfterView \nthis.chartId :\n' + this.chartId);
      console.log(this.chartId);
      this.Chart = am4core.create(this.chartId, am4charts.XYChart);
      console.log('ngAfterView \nthis.chartId :\n' + this.chartId);

      this.key = Object.keys(this.data[0]);
      this.settingKeys = Object.keys(this.setting);
      console.log(this.setting);
      console.log(this.data);
      console.log(this.key);
      let yFullName: string;
      let chartColor: string;
      console.log('ngAfterView \nthis.chartId :\n' + this.chartId);

      console.log(this.data);
      console.log(this.setting);
      console.log(this.setting.statName);
      console.log(this.setting[this.settingKeys[1]]);
      console.log(this.settingKeys);
      am4core.ready(() => {
        console.log('ngAfterView \n amCore ready\nthis.chartId :\n' + this.chartId);

        let chart: am4charts.XYChart;
        chart = this.Chart;
        chart.percentWidth = 90;
        chart.percentHeight = 90;
        chart.layout = 'vertical';
        chart.align = 'center';
        chart.scrollbarX = new am4core.Scrollbar();
        chart.responsive.enabled = false;
        chart.fontFamily = 'Calibri, serif';
        chart.fontWeight = 'lighter';
        console.log(this.chartData);
        console.log(this.data);
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
        categoryAxis.renderer.minGridDistance = 10;
        categoryAxis.renderer.labels.template.horizontalCenter = 'right';
        categoryAxis.renderer.labels.template.verticalCenter = 'middle';

        if (this.settingKeys[0] == 'hisID') {
          categoryAxis.renderer.labels.template.rotation = 0;
          // // Set cell size in pixels
          // let cellSize = 50;
          // chart.events.on("datavalidated", function(ev) {
          //
          //   // Get objects of interest
          //   let chart = ev.target;
          //   let categoryAxis = chart.yAxes.getIndex(0);
          //
          //   // Calculate how we need to adjust chart height
          //   let adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
          //
          //   // get current chart height
          //   let targetHeight = chart.pixelHeight + adjustHeight;
          //
          //   // Set it on chart's container
          //   chart.svgContainer.htmlElement.style.height = targetHeight + "px";
          // });

        } else {
          categoryAxis.renderer.labels.template.rotation = 270;
        }
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.fontSize = '20px';

        const topContainer = chart.chartContainer.createChild(am4core.Container);
        topContainer.toBack();
        topContainer.layout = 'vertical';
        topContainer.paddingTop = 15;
        topContainer.width = am4core.percent(100);

        const Title = topContainer.createChild(am4core.Label);
        Title.text = yFullName;
        Title.fontSize = '20px';
        Title.fontWeight = '400';
        Title.align = 'center';
        // Title.
        Title.paddingBottom = 30;

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
        series.columns.template.column.cornerRadiusTopLeft = 8;
        series.columns.template.column.cornerRadiusTopRight = 8;
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
        console.log('ngAfterView \nthis.chartId :\n' + this.chartId);

        // Cursor
        chart.cursor = new am4charts.XYCursor();
      });
      console.log('ngAfterView \nthis.chartId :\n' + this.chartId);
      this.Service.sendMessageError(false);

    } else {
      console.log('this.chartId :\n' + this.chartId);
      this.Service.sendMessageError(true);
    }


  }

}

import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

// Themes end

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data: any;

  setting: any;
  key: any;
  chartData: any = [];
  Chart: am4charts.PieChart;

  constructor() {
  }

  ngOnDestroy() {
    if (this.Chart) {
      this.Chart.dispose();
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    try {
      if (this.Chart) {
        this.Chart.dispose();
      }
      // Create chart instance
      this.Chart = am4core.create(this.setting.statName + 'Pie', am4charts.PieChart);

    } catch (e) {
      console.log(e);
    }
// Add and configure Series
    let pieSeries = this.Chart.series.push(new am4charts.PieSeries());
    console.log(this.data);
    this.key = Object.keys(this.data[0]);
    this.chartData = [...this.data];
    console.log(this.setting.statName);
    console.log(this.key);

    pieSeries.dataFields.category = this.key[this.key.length - 2];
    pieSeries.dataFields.value = this.key[this.key.length - 1];

// Let's cut a hole in our Pie chart the size of 30% the radius
    this.Chart.innerRadius = am4core.percent(30);

// Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
      {
        property: 'cursor',
        value: 'pointer'
      }
    ];

    pieSeries.alignLabels = true;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);
    pieSeries.labels.template.wrap = true;
    pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

// Create hover state
    let hoverState = pieSeries.slices.template.states.getKey('hover'); // normally we have to create the hover state, in this case it already exists

// Slightly shift the shadow and make it more prominent on hover
    // tslint:disable-next-line:new-parens
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

// Add a legend
    this.Chart.legend = new am4charts.Legend();
    console.log(this.chartData);
    this.Chart.data = [...this.chartData];

  }

}






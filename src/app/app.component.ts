import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'DynamiChart';
  IdChartComponent: any;
  OnClick: boolean;

  ngOnInit() {
    console.log('ngOnint \n', this.IdChartComponent);

  }

  ngOnDestroy(): void {
    this.IdChartComponent = null;
  }

  ngAfterViewInit(): void {
    console.log('ngAfterVuewInt \n', this.IdChartComponent);

  }

  getChartCompID(e: any) {
    this.IdChartComponent = e;
    console.log('getChartCompID \n', e);
  }

  getClickTrigger(e: any) {
    this.OnClick = e;
  }
}

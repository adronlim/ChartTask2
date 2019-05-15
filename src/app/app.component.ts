import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  title = 'DynamiChart';
  IdChartComponent: any;
  Id_Chart_Component: any;
  OnClick: boolean;

  ngOnInit() {
    console.log('ngOnint \n', this.IdChartComponent);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('%cinput changed!!!!!!!!!!', 'background: #222; color: #bada55');
    console.log(changes);
  }
  ngOnDestroy(): void {
    this.IdChartComponent = null;
  }
  ngAfterViewInit(): void {
    console.log('ngAfterVuewInt \n', this.IdChartComponent);
    this.Id_Chart_Component = this.IdChartComponent;

  }
  getChartCompID(e: any) {
    this.IdChartComponent = e;
    console.log('getChartCompID \n', e);
  }
  getClickTrigger(e: any) {
    this.OnClick = e;
  }
}

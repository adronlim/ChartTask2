import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router, VERSION} from '@angular/router';

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
  name: any;

  constructor(private router: Router) {
    this.name = `Angular! v${VERSION.full}`;
  }
  ngOnInit() {
    console.log('ngOnint \n', this.IdChartComponent);
    this.loadModule();
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

  loadModule() {
    this.router.resetConfig([
      ...this.router.config,
      {
        path: 'dynamicModule',
        loadChildren: './dynamic-component.module.ts#DynamicComponentModule'
      }
    ]);

    this.router.navigateByUrl('dynamicModule/dynamicComponent1');
  }
  getChartCompID(e: any) {
    this.IdChartComponent = e;
    console.log('getChartCompID \n', e);
  }
  getClickTrigger(e: any) {
    this.OnClick = e;
  }
}

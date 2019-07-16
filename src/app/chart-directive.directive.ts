import {AfterViewInit, ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ChComponentInt} from './ChComponentInt';
import {ChartDataComponent} from './ChartData';
import {ServicesService} from './services.service';

@Directive({
  selector: '[appChartDirective]'
})
export class ChartDirective implements OnInit, AfterViewInit, OnDestroy {
  componentFactory: any;
  componentRef: any;
  item: any;
  _triggerChange: boolean;
  _componentIndex: number;

  // @Output() Error = new EventEmitter();

  @Input() set componentIndex(componentIndex: number) {
    this._componentIndex = componentIndex;
  }


  // get appChartDirective() {
  //   return this.componentFactory;
  // }

  @Input() set appChartDirective(Item: ChartDataComponent) {
    console.log(Item);
    this.item = Item;
    this.loadChart();
  }

  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, Servers: ServicesService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    console.log('%cinput OnDestroy!!!!!!!!!! CHART DIRECTIVE COMPONENT', 'background: #222; color: #bada55');
    this.viewContainerRef.detach();
    this.viewContainerRef.clear();
  }
  loadChart() {
    console.log(this.item.component);
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
    console.log(this.item);
    this.viewContainerRef.detach();
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
    (this.componentRef.instance as ChComponentInt).data = ServicesService.deepClone(this.item.data);
    console.log((this.componentRef.instance as ChComponentInt).data);
    (this.componentRef.instance as ChComponentInt).setting = ServicesService.deepClone(this.item.setting);
    console.log((this.componentRef.instance as ChComponentInt).setting);
    (this.componentRef.instance as ChComponentInt).key = ServicesService.deepClone(this.item.key);
    (this.componentRef.instance as ChComponentInt).index = this.item.index;
    // this.subscription = this.componentRef.instance.Error.subscribe(clear=>{
    //   if (clear){
    //     this.viewContainerRef.clear();
    //     this.viewContainerRef.detach();
    //   }
    //   this.Error.emit(clear);
    // });
  }


}

// @Input
// {
// let DItem = this.ChartDataComponent.component;
//
// this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(DItem);
// this.viewContainerRef = this.appChartDirective.viewContainerRef;
// this.viewContainerRef.Error();
//
// this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
// (this.componentRef.instance as ChComponentInt).data = this.ChartDataComponent.data;
// console.log((this.componentRef.instance as ChComponentInt).data);
// (this.componentRef.instance as ChComponentInt).setting = this.ChartDataComponent.setting[0];
// console.log((this.componentRef.instance as ChComponentInt).setting);
// }

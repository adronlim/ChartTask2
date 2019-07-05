import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {ChComponentInt} from './ChComponentInt';
import {ChartDataComponent} from './ChartData';
import {Subscription} from 'rxjs';
import {ServicesService} from './services.service';

@Directive({
  selector: '[appChartDirective]'
})
export class ChartDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  componentFactory: any;
  componentRef: any;
  ChartDataComponent: ChartDataComponent;
  item: any;
  _triggerChange: boolean;
  _componentIndex: number;
  subscription: Subscription;

  // @Output() Error = new EventEmitter();

  get triggerChange() {
    return this._triggerChange;
  }

  @Input() set componentIndex(componentIndex: number) {
    this._componentIndex = componentIndex;
  }

  @Input() set triggerChange(triggerChange: boolean) {
    console.log(triggerChange);
    this._triggerChange = triggerChange;
  }
  get appChartDirective() {
    return this.componentFactory;
  }

  @Input() set appChartDirective(Item: ChartDataComponent) {
    console.log(Item);
    this.item = Item;
    this.clear(true);
    this.loadChart();
  }

  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, Servers: ServicesService) {
  }

  @Input()
  clear(Switch: boolean) {
    if (Switch) {
      this.viewContainerRef.clear();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('%cinput changed!!!!!!!!!! CHART DIRECTIVE COMPONENT', 'background: #222; color: #bada55');

    console.log(changes);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    console.log('%cinput OnDestroy!!!!!!!!!! CHART DIRECTIVE COMPONENT', 'background: #222; color: #bada55');

    this.viewContainerRef.detach();
    this.subscription.unsubscribe();
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

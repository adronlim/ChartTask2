import {AfterViewInit, ComponentFactoryResolver, Directive, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {ChComponentInt} from './ChComponentInt';
import {ChartDataComponent} from './ChartData';

@Directive({
  selector: '[appChartDirective]'
})
export class ChartDirective implements OnInit, AfterViewInit, OnChanges {
  componentFactory: any;
  componentRef: any;
  ChartDataComponent: ChartDataComponent;
  item: any;
  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  _triggerChange: boolean;
  _componentIndex: number;


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
  clear(Switch: boolean) {
    if (Switch) {
      this.viewContainerRef.clear();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    // if (changes.triggerChange.previousValue !== changes.triggerChange.currentValue && changes.triggerChange.currentValue === true) {
    //   this._triggerChange = false;
    //   this.loadChart();
    // }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  loadChart() {
    console.log(this.item.component);
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
    console.log(this.item);
    this.viewContainerRef.clear();

    this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
    (this.componentRef.instance as ChComponentInt).data = this.item.data;
    console.log((this.componentRef.instance as ChComponentInt).data);
    (this.componentRef.instance as ChComponentInt).setting = this.item.setting;
    console.log((this.componentRef.instance as ChComponentInt).setting);
    (this.componentRef.instance as ChComponentInt).key = this.item.key;
    (this.componentRef.instance as ChComponentInt).index = this.item.index;
  }
}


// @Input
// {
// let DItem = this.ChartDataComponent.component;
//
// this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(DItem);
// this.viewContainerRef = this.appChartDirective.viewContainerRef;
// this.viewContainerRef.clear();
//
// this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
// (this.componentRef.instance as ChComponentInt).data = this.ChartDataComponent.data;
// console.log((this.componentRef.instance as ChComponentInt).data);
// (this.componentRef.instance as ChComponentInt).setting = this.ChartDataComponent.setting[0];
// console.log((this.componentRef.instance as ChComponentInt).setting);
// }

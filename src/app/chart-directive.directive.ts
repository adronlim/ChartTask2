import {AfterViewInit, ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ChComponentInt} from './ChComponentInt';
import {ChartDataComponent} from './ChartData';

@Directive({
  selector: '[appChartDirective]'
})
export class ChartDirective implements OnInit, AfterViewInit {
  componentFactory: any;
  componentRef: any;
  ChartDataComponent: ChartDataComponent;

  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  get appChartDirective() {
    return;
  }

  @Input() set appChartDirective(Item: ChartDataComponent) {
    console.log(Item);
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(Item.component);
    this.viewContainerRef.clear();

    this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
    (this.componentRef.instance as ChComponentInt).data = Item.data;
    console.log((this.componentRef.instance as ChComponentInt).data);
    (this.componentRef.instance as ChComponentInt).setting = Item.setting[0];
    console.log((this.componentRef.instance as ChComponentInt).setting);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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

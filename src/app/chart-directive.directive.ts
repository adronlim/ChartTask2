import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appChartDirective]'
})
export class ChartDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }

  // idComponentC: any;
  @Input() appChartDirective(status: boolean) {
    if (status) {
      this.viewContainerRef.clear();
    }
  }

  CBfunction(CB) {
    CB();
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

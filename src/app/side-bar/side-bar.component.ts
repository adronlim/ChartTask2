import {Component, EventEmitter, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  idComponent: any;
  @Output() idEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickTruthEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onClickId(e: any) {
    let click = true;
    this.idComponent = e.target.id;
    this.idEmitter.emit(this.idComponent);
    this.clickTruthEmitter.emit(click);
    console.log('OnClickId \n', this.idComponent);
  }

  onReload() {
    location.reload();
  }
  ngOnInit() {
    console.log('ngOnint \n', this.idComponent);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.input) {
      console.log('%cinput changed!!!!!!!!!!', 'background: #222; color: #bada55');
      console.log(changes);
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit \n', this.idComponent);
  }
}

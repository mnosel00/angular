import { Component, Input, OnChanges,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-stars',
  templateUrl: 'stars.component.html',
  styleUrls: ['stars.component.css'],
})
export class StarComponent implements OnChanges {
 @Input() rating: number = 0;
  cropWidth: number = 75;
 @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(): void {
    this.cropWidth = (this.rating * 75) / 5;
  }

  onClick():void{
    console.log(this.rating);
    this.ratingClicked.emit(`Output ${this.rating}`)
  }
}

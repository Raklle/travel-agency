import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  rate(e:any) {
      this.newItemEvent.emit(e.target.value);
  }
}

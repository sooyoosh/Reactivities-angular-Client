import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCounter, selectEvents, selectTitle } from '../../stores/counter/counter.selectors';
import * as Action from '../../stores/counter/counter.actions'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  counter$=this.store.select(selectCounter);
  title$=this.store.select(selectTitle);
  events$=this.store.select(selectEvents);
  
  constructor(private store:Store){}




inc(){
  this.store.dispatch(Action.increment())
}
dec(){
  this.store.dispatch(Action.decrement())
}
incFive(){
  this.store.dispatch(Action.incrementMyValue({val:5}))
}

}

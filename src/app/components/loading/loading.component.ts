import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoadingState } from '../../stores/loading/loading.selectors';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

loading$=this.store.select(selectLoadingState);

constructor(public store:Store){}


}

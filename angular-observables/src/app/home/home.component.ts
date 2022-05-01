import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription!: Subscription;
  customObsSubscription!: Subscription;

  constructor() { }

  ngOnInit() {
    const myNum1 = interval(1000).pipe(
      map((data: number) => {
        return data*2;
      })
    );
    this.numbersObsSubscription = myNum1.subscribe(
      (num: number) => {
        console.log(num);
      }
    );

    const myNum2 = new Observable(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first package');
        }, 2000);
        setTimeout(() => {
          observer.next('second package');
        }, 4000); 
        setTimeout(() => {
          // observer.error('this will not work!');
          observer.complete();
        }, 5000);
        setTimeout(() => {
          observer.error('third package');
        }, 6000);
      }
    );

    this.customObsSubscription = myNum2.subscribe(
      (data: string) => { console.log("Data: " + data); },
      (error: string) => { console.log("Error" + error); },
      () => { console.log("Completed"); }
    );
  }

  ngOnDestroy(): void {
      this.numbersObsSubscription.unsubscribe();
      this.customObsSubscription.unsubscribe();
  }
}

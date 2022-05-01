import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px)',
        })
      ),
      transition('normal <=> highlighted', animate(500)),
      // transition('highlighted => normal', animate(800)),
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          backgroundColor: 'green',
          transform: 'translateX(0px) scale(0.5)',
        })
      ),
      transition('normal => highlighted', animate(500)),
      transition('highlighted => normal', animate(800)),
      // transition('shrunken <=> *', animate(500, style({
      //   borderRadius: '50px'
      // }))),
      transition('shrunken <=> *', [
        style({ backgroundColor: 'orange' }),
        animate(1000, style({ borderRadius: '50px' })),
        animate(500),
      ]),
    ]),
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0, transform: 'translateX(+100px)' })),
      ]),
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({ transform: 'translate(-100px)', opacity: 0, offset: 0 }),
            style({ transform: 'translate(-50px)', opacity: 0.5, offset: 0.3 }),
            style({ transform: 'translate(-20px)', opacity: 1, offset: 0.8 }),
            style({ transform: 'translate(0)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
      transition('* => void', [
        group([
          animate(500, style({ backgroundColor: 'red' })),
          animate(500, style({ opacity: 0, transform: 'translateX(+100px)' })),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }
  onShrink() {
    this.wildState = 'shrunken';
  }
  onAdd(item: string) {
    this.list.push(item);
  }
  onDelete(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event: any) {
    console.log(event);
  }
  animationEnded(event: any) {
    console.log(event);
  }
}

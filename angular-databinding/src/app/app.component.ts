import { Component } from '@angular/core';
import { Server } from './server.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements: Server[] = [
    new Server('server', 'Test1', 'Description of test 1.'),
    // new Server('blueprint', 'Test2', 'Description of test 2.'),
  ];

  onServerAdded(data: { name: string, content: string }) {
    this.serverElements.push(new Server('server', data.name, data.content));
  }

  onBlueprintAdded(data: { name: string, content: string }) {
    this.serverElements.push(new Server('blueprint', data.name, data.content));
  }

  onChangeFirst() {
    this.serverElements[0].name = "Changed!";
  }
  onDeleteFirst() {
    this.serverElements.splice(0,1);
  }
}

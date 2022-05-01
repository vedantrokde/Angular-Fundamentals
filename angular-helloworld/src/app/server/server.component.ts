import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server', // to make it a tag
  // selector: '[app-server]', // to make it an attribute
  // selector: '.app-server', // to make it a class
  templateUrl: './server.component.html',
  // template: `<app-server></app-server>`,
  styleUrls: ['./server.component.css'],
  // styles: [` h1, h2, h3 { color: dogerblue; } `]
})
export class ServerComponent implements OnInit {
  serverId: number = 10;
  serverStatus: string = 'OFFLINE';
  serverName: string = 'Dummy';
  allowNewServer = false;
  serverCreated = false;
  serverCreationStatus = "No server created!"

  servers = ['TestServer', 'DummyServer']

  constructor() {
    setTimeout(() => {
      this.allowNewServer=true;
    }, 3000);
  }

  ngOnInit(): void {}

  getServerStatus() {
    this.serverStatus = Math.random() > 0.5 ? 'ONLINE' : 'OFFLINE';
    return this.serverStatus;
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Server ${this.serverName} created successfully.`;
  }
  onDeleteServer() {
    this.serverCreated = false;
    this.serverCreationStatus = "Server deleted successfully.";
  }

  onUpdateServerName(event: any){
    this.serverName = event.target.value;
  }

  getColor() {
    return this.serverStatus === 'ONLINE' ? 'green' : 'red';
  }
}

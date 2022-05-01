import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string} | undefined;
  id!:number;
  serverName='';
  serverStatus='';
  allowEdit = false;
  changeSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.id);
    this.serverName = this.server!.name;
    this.serverStatus = this.server!.status;

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );

    this.route.fragment.subscribe();
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit']==='1'?true:false;
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server!.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved=true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName!==this.server?.name || this.serverStatus!==this.server.status) && !this.changeSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}

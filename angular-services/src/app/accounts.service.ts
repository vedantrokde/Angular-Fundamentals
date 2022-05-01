import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable({providedIn: 'root'})
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  constructor(private logService: LoggingService){}

  statusUpdated = new EventEmitter<string>();

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.logService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.logService.logStatusChange(status);
  }
}

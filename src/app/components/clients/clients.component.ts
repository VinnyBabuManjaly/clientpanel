import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number = 0;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.clients.forEach(client =>
      this.totalOwed += client.balance
    );
    return this.totalOwed ;

    //other way
    // this.totalOwed = this.clients.reduce((total, client) => {
    //   return total + client.balance;
    // }, 0);
  }
  
}

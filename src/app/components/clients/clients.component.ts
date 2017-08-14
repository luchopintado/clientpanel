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
  totalOwed: number;

  constructor (public clientService: ClientService) {
  }

  ngOnInit () {
    console.log('ngOnInit');
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
      console.log(this.clients);
    });
  }

  getTotalOwed () {
    if (this.clients && this.clients.length) {
      const objTotal = this.clients.reduce((a: Client, b: Client) => ({balance: a.balance * 1 + b.balance * 1}));
      this.totalOwed = objTotal.balance;
    } else {
      this.totalOwed = 0;
    }

    console.log(this.totalOwed);
  }
}

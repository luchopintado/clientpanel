import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ClientService]
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor (public clientService: ClientService) {

  }

  ngOnInit () {
    console.log('ngOnInit');
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients);
    });
  }

}

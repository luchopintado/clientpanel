import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {

  clients: FirebaseListObservable<any[]>;
  client: FirebaseObjectObservable<any>;

  constructor(public afd: AngularFireDatabase) {
    this.clients = this.afd.list('/clients') as FirebaseListObservable<Client[]>;
  }

  getClients () {
    return this.clients;
  }

  newClient (client: Client) {
    this.clients.push(client);
  }

}

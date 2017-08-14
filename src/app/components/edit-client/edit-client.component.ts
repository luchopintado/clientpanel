import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  disabledBalanceOnEdit: boolean;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.disabledBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disabledBalanceOnEdit) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      // Add new client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client updated', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/client/' + this.id]);
    }
  }

}

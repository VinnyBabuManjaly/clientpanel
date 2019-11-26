import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = false;
  @ViewChild('clientForm', {read: true, static: true}) form: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if(!valid) {
      // Show error
      console.log('Please fill out the form correctly');
      this.messageService.add({severity:'error', summary:'Please fill out the form correctly', key: 'key1'});
      setTimeout(() => {
        this.messageService.clear('key1');
      }, 3000);
      } else {
      // Add new client
      this.clientService.newClient(value);
      // Show message
      console.log('New client added');
      this.messageService.add({severity:'success', summary:'New client added', key: 'key2'});
      setTimeout(() => {
        this.messageService.clear('key2');
      }, 3000);
      // Redirect to dash
      //this.router.navigate(['/']);
    }
  }

}

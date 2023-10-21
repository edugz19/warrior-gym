import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  users: User[];
  actual_user: any;

  constructor() {
    this.users = [];
    this.actual_user = {};
  }
  
}

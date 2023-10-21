import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, map } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  usersDoc: AngularFirestoreDocument<User>;

  constructor(public db: AngularFirestore) {
    this.usersCollection = this.db.collection('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
          const data = a.payload.doc.data() as User;
          data.dni = a.payload.doc.id;
          return data;
        }))
    );
  }

  getUsers() {
    return this.users;
  }

  getUserwithID(id: string) {
    return this.db.collection<User>('users').doc(id).valueChanges();
  }

  addUser(user: User) {
    this.db.collection('users').doc(user.dni).set(user);
  }

  editUser(user: User) {
    this.db.collection('users').doc(user.dni).update(user);
  }

  deleteUser(id: string) {
    this.db.collection('users').doc(id).delete();
  }
}

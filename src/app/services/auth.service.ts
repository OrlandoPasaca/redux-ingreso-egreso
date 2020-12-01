import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducers';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  constructor(public auth: AngularFireAuth, public firetore: AngularFirestore, private store: Store<AppState>) { }
  initAuthListenner() {
    this.auth.authState.subscribe((fUser) => {
      if (fUser) {

        this.userSubscription = this.firetore.doc(`${fUser.uid}/usuario`).valueChanges()
          .subscribe((fireStoreUser: any) => {

            console.log(fireStoreUser);
            const user = Usuario.fireStorUser(fireStoreUser);
            this.store.dispatch(setUser({ user }));

          });
      } else {

        this.userSubscription.unsubscribe();
        this.store.dispatch(unSetUser());

      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const usuario: Usuario = new Usuario(user.uid, nombre, user.email);
        this.firetore.doc(`${user.uid}/usuario`).set({ ...usuario });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  isAuth() {
    return this.auth.authState.pipe(map(fUser => fUser != null));
  }
}

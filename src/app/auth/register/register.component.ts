import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  uiSubscription: Subscription;
  cargando = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit() {

    this.form = this.fb.group(
      {
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    );
    this.uiSubscription = this.store.select('ui').subscribe(res => {
      this.cargando = res.isLoading;
    });

  }
  crearUsuario() {
/*     Swal.showLoading()
 */    if ( this.form.invalid ) {
          return;
        }

       this.store.dispatch(isLoading());
       const { nombre, email, password } = this.form.value;
       this.auth.crearUsuario(nombre, email, password)
      .then(credenciales => {
        this.store.dispatch(stopLoading());
/*         Swal.close();
 */     console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(stopLoading());
        Swal.fire(
          {
            icon: 'error',
            title: 'Ops...',
            text: err.message
          });
      });
  }

}

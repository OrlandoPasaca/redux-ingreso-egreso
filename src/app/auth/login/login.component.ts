import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
      console.log('Cargando subs');
    });
  }
  loginUsuario() {
    /* Swal.showLoading() */
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    const { email, password } = this.loginForm.value;
    this.auth.loginUsuario(email, password)
      .then(res => {
        /* Swal.close(); */
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch(res => {
        this.store.dispatch(stopLoading());

        Swal.fire(
          {
            icon: 'error',
            title: 'Ops...',
            text: res.message
          }
        );
      });
  }

}

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userAuthReducer } from './components/user/user.store/user.store.reducer';
import { AuthEffects } from './components/user/user.store/user.store.effects';
import { authInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideStore({ auth: userAuthReducer }), 
    provideEffects([AuthEffects])
  ]
};

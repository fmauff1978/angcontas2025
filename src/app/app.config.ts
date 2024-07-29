import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


registerLocaleData(localePt);


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'contas-27a8b',
        appId: '1:549391682813:web:541256ea0c386ad9470294',
        storageBucket: 'contas-27a8b.appspot.com',
        apiKey: 'AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU',
        authDomain: 'contas-27a8b.firebaseapp.com',
        messagingSenderId: '549391682813',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    {provide: LOCALE_ID,useValue:'pt'},{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],

};

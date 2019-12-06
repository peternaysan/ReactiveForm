import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule} from '@angular/service-worker';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { SwPushNotificationComponent } from './sw-push-notification/sw-push-notification.component';
import { environment } from '../environments/environment';
import { ConfigService } from './shared/configservice';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    SwPushNotificationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  // providers: [
  //   {
  //     provide: APP_INITIALIZER,
  //     multi: true,
  //     deps: [ConfigService],
  //     useFactory: (appConfigService: ConfigService) => {
  //       return () => {
  //         //Make sure to return a promise!
  //         return appConfigService.loadAppConfig();
  //       };
  //     }
  //   }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }

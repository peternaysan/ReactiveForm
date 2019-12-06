import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/configservice';

@Injectable({
  providedIn: 'root'
})
export class PushserviceService {
  readonly VAPID_PUBLIC_KEY = '<VAPID-PUBLIC-KEY-HERE>';
  private baseUrl: string;

  constructor(private http: HttpClient,
              private swPush: SwPush,
              private configService: ConfigService) {
                this.baseUrl = this.configService.apiBaseUrl;
                this.VAPID_PUBLIC_KEY = this.configService.vapIdKey;
              }

              subscribeToNotification() {
                this.swPush.requestSubscription({
                    serverPublicKey: this.VAPID_PUBLIC_KEY
                })
                .then(sub => this.sendToServer(sub))
                .catch(err => console.error('Could not subscribe to notifications', err));
              }
              sendToServer(params: any) {
                 this.http.post(this.baseUrl, { notification : params }).subscribe();
              }
}

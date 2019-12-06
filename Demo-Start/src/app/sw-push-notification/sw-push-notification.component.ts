import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushserviceService } from '../service/pushservice.service';


@Component({
  selector: 'app-sw-push-notification',
  templateUrl: './sw-push-notification.component.html',
  styleUrls: ['./sw-push-notification.component.css']
})
export class SwPushNotificationComponent implements OnInit {
  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';

  constructor(private swPush: SwPush,
              private webNotificationService: PushserviceService) {
                this.swPush.notificationClicks.subscribe( event => {
                  console.log('Received notification: ', event);
                  const url = event.notification.data.url;
                  window.open(url, '_blank');
                });
              }

  ngOnInit() {
  }
  submitNotification(): void {
    this.webNotificationService.subscribeToNotification();
  }

}

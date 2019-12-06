import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwPushNotificationComponent } from './sw-push-notification.component';

describe('SwPushNotificationComponent', () => {
  let component: SwPushNotificationComponent;
  let fixture: ComponentFixture<SwPushNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwPushNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwPushNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

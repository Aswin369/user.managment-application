import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupBlockUnblockComponent } from './popup-block-unblock.component';

describe('PopupBlockUnblockComponent', () => {
  let component: PopupBlockUnblockComponent;
  let fixture: ComponentFixture<PopupBlockUnblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupBlockUnblockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupBlockUnblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

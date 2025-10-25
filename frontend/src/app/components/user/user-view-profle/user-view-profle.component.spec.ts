import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewProfleComponent } from './user-view-profle.component';

describe('UserViewProfleComponent', () => {
  let component: UserViewProfleComponent;
  let fixture: ComponentFixture<UserViewProfleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewProfleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewProfleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

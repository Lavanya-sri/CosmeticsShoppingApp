import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAppComponent } from './sub-app.component';

describe('SubAppComponent', () => {
  let component: SubAppComponent;
  let fixture: ComponentFixture<SubAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubAppComponent]
    });
    fixture = TestBed.createComponent(SubAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

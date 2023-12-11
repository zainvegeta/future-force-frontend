import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryInformationComponent } from './statutory-information.component';

describe('StatutoryInformationComponent', () => {
  let component: StatutoryInformationComponent;
  let fixture: ComponentFixture<StatutoryInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatutoryInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatutoryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

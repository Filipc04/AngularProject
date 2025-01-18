import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopanimesComponent } from './topanimes.component';

describe('TopanimesComponent', () => {
  let component: TopanimesComponent;
  let fixture: ComponentFixture<TopanimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopanimesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopanimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

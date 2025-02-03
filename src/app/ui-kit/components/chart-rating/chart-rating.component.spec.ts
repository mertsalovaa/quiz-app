import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartRatingComponent } from './chart-rating.component';
import { DebugElement } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

describe('ChartRatingComponent', () => {
  let fixture: ComponentFixture<ChartRatingComponent>;
  let component: ChartRatingComponent;
  let debugElement: DebugElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ChartRatingComponent],
      imports: [NgApexchartsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartRatingComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly initialize data', () => {
    expect(component.chart).not.toBeNull();
    expect(component.chartOptions).not.toBeNull();
    expect(component.data).not.toBeNull();
  });
});

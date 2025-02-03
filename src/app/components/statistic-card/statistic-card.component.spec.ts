import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticCardComponent } from './statistic-card.component';
import { DebugElement } from '@angular/core';
import { TypographyComponent } from '../../ui-kit/components/typography/typography.component';
import { By } from '@angular/platform-browser';

describe('StatisticCardComponent', () => {
  let fixture: ComponentFixture<StatisticCardComponent>;
  let component: StatisticCardComponent;
  let debugElement: DebugElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticCardComponent, TypographyComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render text components correctly', () => {
    debugElement.queryAll(By.directive(TypographyComponent)).map((item) => {
      expect(item).toBeTruthy();
      expect(item.nativeElement.textContent).not.toBeNull();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: '<app-ui-link [link]="testLink">{{ testContent }}</app-ui-link>',
})
class TestHostComponent {
  testLink: string = '/test-route';
  testContent: string = 'test-content';
}

describe('LinkComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let debugElement: DebugElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LinkComponent, TestHostComponent ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should create the verified content inside component', () => {
    fixture.detectChanges();

    const anchorElement = debugElement.query(By.directive(LinkComponent)).nativeElement;

    expect(anchorElement.textContent.trim()).toBe(hostComponent.testContent);
  });

  it('should set the correct routerLink attribute', () => {
    fixture.detectChanges();

    const anchorElement = debugElement.query(By.css('a')).nativeElement;
    
    expect(anchorElement.getAttribute('ng-reflect-router-link')).toBe(
      hostComponent.testLink,
    );
  });
});
